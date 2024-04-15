import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res)=> {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15h', // Expires in 15 hours
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 60 * 1000, // Max age in milliseconds (15 hours)
        sameSite: "strict",
    });

    return token;
};

export default generateTokenAndSetCookie;
