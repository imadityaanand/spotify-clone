import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import cloudinary from "../lib/cloudinary.js"

export const checkAdmin = async (req, res, next) => {
    return res.status(200).json({admin: true});
}

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        });
        return result.secure_url;
    } catch(err) {
        console.log("Error in uploadToCloudinary", err);
        throw new Error("Error in uploadToCloudinary",err);
    }
}

export const createSong = async (req, res, next) => {
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({message: "Please upload all files."});
        }
        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl = uploadToCloudinary(audioFile);
        const imageUrl = uploadToCloudinary(imageFile);

        const song = new Song({title, artist, audioUrl, imageUrl, duration, albumId: albumId | null});

        await song.save();

        if(albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: {songs: song._id},
            });
        }
        return res.status(200).json(song);
    } catch(err) {
        console.log("Error in create song controller", err);
        next(err);
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        // title: { type: String, required: true },
        //     artist: { type: String, required: true },
        //     imageUrl: { type: String, required: true },
        //     releaseYear: { type: Number, required: true },
        //     songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
        if(!req.title || !req.artist || !req.files.imageFile || !req.releaseYear) {
            return res.status(400).json({message: "Please upload all files."});
        }
        const { title, artist, releaseYear } = req.body;
        const imageFile = req.files.imageFile

        const imageUrl = uploadToCloudinary(imageFile);

        const album = new Album({title, artist, imageUrl, releaseYear, songs: []});

        await album.save();

        return res.status(200).json(song);
    } catch(err) {
        console.log("Error in create album controller", err);
        next(err);
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const {id} = req.params;
        const song = Song.findById(id);
        if(song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id }
            })
        }
        await Song.findByIdAndDelete(id);
        res.send(200).json({message: "Song deleted successfully"})
    } catch(err) {
        console.log("Error in delete song", err);
        next(err);
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Song.deleteMany({albumId: id});
        await Album.findByIdAndDelete(id);
        
        res.send(200).json({message: "Album deleted successfully"})
    } catch(err) {
        console.log("Error in delete album", err);
        next(err);
    }
}