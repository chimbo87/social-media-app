import { useState } from "react";
import useShowToast from "./useShowToast";
import { useRecoilValue } from "recoil";
import UserAtom from "../atoms/UserAtom";

function useFollowUnfollow(user) {
    const currentUser = useRecoilValue(UserAtom);
    const [following, setFollowing] = useState(user.followers.includes(currentUser?._id));
    const [updating, setUpdating] = useState(false);
    const showToast = useShowToast();

    const handleFollowUnfollow = async () => {
        if (!currentUser) {
            showToast("Error", "Please login to follow", "error");
            return;
        }
        if (updating) return;
        setUpdating(true);
        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            if (following) {
                showToast("Success", `Unfollowed ${user.name}`, "success");
                // Create a new array to avoid direct mutation
                user.followers = user.followers.filter(id => id !== currentUser._id);
            } else {
                showToast("Success", `Followed ${user.name}`, "success");
                // Create a new array to avoid direct mutation
                user.followers = [...user.followers, currentUser._id];
            }
            setFollowing(!following);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setUpdating(false);
        }
    };

    return { handleFollowUnfollow, updating, following };
}

export default useFollowUnfollow;
