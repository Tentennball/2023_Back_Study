
//env
require('dotenv').config();

const {Post} = require(process.env.SERVER_PATH + "/models");
const {Op} = require('sequelize');

const register = async (content) => {
    try{
        await Post.create({
            title: content.title,
            content: content.content,
            views: content.views,
            like_count: content.like_count,
            user_id: content.user_id
        });
        return [null, "completed"];
    }catch(error){
        return [error, "error"];
    }
}

const postList = async () => {
    try{
        const rows = await Post.findAll();
        return [rows, "completed"];
    }catch(error){
        return [error, "error"];
    }
}

const getMostPost = async (type, number) => {
    const getType = (type) => {
        switch (type){
            case "most":
                return "views";
            case "recent":
                return "createdAt";
            default:
                return false;
        }
    }
    try{
        const limit = Number(number.match(/^\d+$/) ? number : "1");
        const col = getType(type);
        if (!col){
            throw new Error("Invalid type");
        }
        const posts = await Post.findAll({
            order: [[col, "DESC"]],
            limit: limit,
        });
        return [posts, "completed"]
    }catch(error){
        return [error, "error"];
    }
}


const search = async (type, text) => {
    const getType = (type) => {
        switch (type){
            case "title":
                return "title";
            case "content":
                return "content";
            default:
                return false;
        }
    }

    try{
        const col = getType(type);
        if (!col){
            throw new Error("Invalid type");
        }
        const obj = {};
        obj[col] = {
            [Op.like]: `%${text}%`
        }
        const posts = await Post.findAll({
            where: {
                ...obj
            }
        });
        return [posts, "completed"]
    }catch(error){
        return [error, "error"];
    }
}

const getUserPost = async (user)=>{
    try{
        const rows = await Post.findAll({
            where:{
                user_id:user
            }
        });
        return [rows, "completed"];
    }catch(error){
        return [error, "error"];
    }
}

module.exports.register = register;
module.exports.postList = postList;
module.exports.getMostPost = getMostPost;
module.exports.search = search;
module.exports.getUserPost = getUserPost;