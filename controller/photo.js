const {Comment, Photo, User} = require("../models");
class PhotoC{

    // Akses Sudah Login
    static async getAllPhotos (req, res) {
        try {
            const data = await Photo.findAll({
                include: User
            })

            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    // Akses susuai ID
    static async getPhotoById(req, res) {
        try {
            const { photoId } = req.params
            const userData = req.userData
            const data = await Photo.findOne({
                where: {
                    id : parseInt(photoId),
                    UserId: userData.id
                }
            })

            if(!data) {
                throw {
                    code: 404,
                    message: "Photo not found!"
                }
            }

            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(error.code || 500).json(error.message)
        }
    }

    // Add Photos
    static async addPhoto (req, res) {
        try {
            const {
                title,
                caption,
                image_url
            } = req.body

            const userData = req.userData
            // console.log(userData, "<<userdata")

            const data = await Photo.create({
                title,
                caption,
                image_url,
                UserId: userData.id
            });
           
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // Update Photo
    static async updatePhoto (req, res) {
        try {
            const {
                title,
                caption,
                image_url
            } = req.body

            const { photoId } = req.params

            const data = await Photo.update({
                title,
                caption,
                image_url
            }, {
                where: {
                    id : parseInt(photoId)
                },
                returning : true
            })

            if (!data[0]) {
                throw {
                    code: 404,
                    message: "Photo not Found!"
                }
            }

            res.status(201).json(data)
        } catch (error) {
            console.log(error)
            res.status(error.code || 500).json(error.message)
        }
    }

    //Delete Photo By ID
    static async deletePhotoById(req, res) {
        try {
            const { photoId } = req.params
            const data = await Photo.destroy({
                where:{
                    id : parseInt(photoId)
                }
            })
            if (!data) {
                throw {
                    code: 404,
                    message: "Photo not found!"
                }
            }
            res.status(200).json("Your photo has been successfully deleted")

        } catch (error) {
            console.log(error)
            res.status(error.code || 500).json(error.message)
        }
    }
}
module.exports = PhotoC;