// import axios from 'axios'
const axios = require('axios');
require("dotenv").config();

/**
 * firebase interface
 * @param {*} url : model name + key
 * @param {*} method : method type
 * @param {*} body : data
 * @returns 
 */
const firebase = async (url, method, body) => {
    axios.defaults = {
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        // },
        withCredentials: true
    };

    return await axios({
        url: process.env.FIREBASE_URL + url + '.json',
        method: method,
        data: body
    })
}

module.exports = firebase;