// import axios from "axios";
import { api } from "./api"


const getAll = async () => {
    return await api.get("/coins/list").catch((e) => { console.log(e) });
}

const getOneCoin = async (id: string) => {
    return await api.get(`/coins/${id}`).catch((e) => { console.log(e) });
}

const getCoinChart = async (id: string, currency: string) => {
    return await api.get(`/coins/${id}/market_chart?vs_currency=${currency}&days=30&interval=daily`).catch((e) => { console.log(e) });
}

const getAllCoins = async (currency: string, page: number, ordering?: string) => {
    return await api.get(`/coins/markets?vs_currency=${currency}&order=${ordering}&page=${page}`).catch((e) => { console.log(e) });
}

const getAllByMarket = async (currency: string) => {
    return await api.get(`/coins/markets?vs_currency=${currency}`).catch((e) => { console.log(e) });
}

const getAllByVolume = async (currency: string) => {
    return await api.get(`/coins/markets?vs_currency=${currency}&order=volume_desc`).catch((e) => { console.log(e) });
}

const getTrendingCoins = async () => {
    return await api.get(`/search/trending`).catch((e) => { console.log(e) });
}

export default { getAll, getOneCoin, getCoinChart, getAllCoins, getAllByMarket, getAllByVolume, getTrendingCoins }
