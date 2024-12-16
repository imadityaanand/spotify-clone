import { User } from "../models/user.model.js";

export const authCallback =  async (req, res) => {
    try {
        const {id, firstName, lastName, imageUrl} = req.body;
        const user = await User.findOne({clerkId: id});

        if(!user) {
            await User.create({
                fullName: `${firstName} ${lastName}`,
                imageUrl: imageUrl,
                clerkid: id
            })
        }
        res.status(200).json({success:true});

    } catch(err) {
        console.log("Error in auth callback", err);
        next(err);
    }
}