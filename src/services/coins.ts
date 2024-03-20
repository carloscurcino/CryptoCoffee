// import axios from "axios";
import { api } from "./api"


const getAll = async () => {
    return await api.get("/coins/list").catch((e) => { console.log(e) });
}

const getAllByMarket = async (currency: string) => {
    return await api.get(`/coins/markets?vs_currency=${currency}`).catch((e) => { console.log(e) });
}

const getAllByVolume = async (currency: string) => {
    return await api.get(`/coins/markets?vs_currency=${currency}&order=volume_desc`).catch((e) => { console.log(e) });
}

export default { getAll, getAllByMarket, getAllByVolume }
