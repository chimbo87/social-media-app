import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/UserAtom';
import useShowToast from './useShowToast';

function useLogout(onClose) {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.ok) {
        showToast("Success", "Logged out successfully", "success");
        localStorage.removeItem("user-threads");
        setUser(null);
        navigate("/auth");
        if (onClose) onClose(); // Close the drawer
      } else {
        showToast("Error", data.error, "error");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return logout;
}

export default useLogout;
