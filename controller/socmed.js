const {Comment, SocialMedia, User} = require("../models");
class SocialMediaC{

    // Akses Sudah Login
    static async getAllSocialMedias (req, res) {
        try {
            const data = await SocialMedia.findAll({
                include: User
            })

            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    // Akses susuai ID
    static async getSocialMediaById(req, res) {
        try {
            const { SocialMediaId } = req.params
            const userData = req.userData
            const data = await SocialMedia.findOne({
                where: {
                    id : parseInt(SocialMediaId),
                    UserId: userData.id
                }
            })

            if(!data) {
                throw {
                    code: 404,
                    message: "SocialMedia not found!"
                }
            }

            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(error.code || 500).json(error.message)
        }
    }

    // Add SocialMedias
    static async addSocialMedia (req, res) {
        try {
            const {
                name,
                social_media_url
            } = req.body

            const userData = req.userData
            // console.log(userData, "<<userdata")

            const data = await SocialMedia.create({
                name,
                social_media_url,
                UserId: userData.id
            });
           
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // Update SocialMedia
    static async updateSocialMedia (req, res) {
        try {
            const {
                name,
                social_media_url
            } = req.body

            const { SocialMediaId } = req.params

            const data = await SocialMedia.update({
                name,
                social_media_url
            }, {
                where: {
                    id : parseInt(SocialMediaId)
                },
                returning : true
            })

            if (!data[0]) {
                throw {
                    code: 404,
                    message: "SocialMedia not Found!"
                }
            }

            res.status(201).json(data)
        } catch (error) {
            console.log(error)
            res.status(error.code || 500).json(error.message)
        }
    }

    //Delete SocialMedia By ID
    static async deleteSocialMediaById(req, res) {
        try {
            const { SocialMediaId } = req.params
            const data = await SocialMedia.destroy({
                where:{
                    id : parseInt(SocialMediaId)
                }
            })
            if (!data) {
                throw {
                    code: 404,
                    message: "SocialMedia not found!"
                }
            }
            res.status(200).json("Your SocialMedia has been successfully deleted")

        } catch (error) {
            console.log(error)
            res.status(error.code || 500).json(error.message)
        }
    }
}
module.exports = SocialMediaC;