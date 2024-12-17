import { User } from "../models/user.model.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        const user = await User.find({clerkid: {$ne: currentUserId}});
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}