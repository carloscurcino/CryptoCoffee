import axios from "axios"

export const api = axios.create({
    baseURL: "https://api.coingecko.com/api/v3"
})


api.defaults.headers["Authorization"] = `${import.meta.env.API_KEY}`



export const URL_API = "https://api.coingecko.com/api/v3"