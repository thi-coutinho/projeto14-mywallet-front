import axios from "axios"
import { BASE_URL } from "../constants/url"

export function config(token) {
    return {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
}

function compareFunction(a,b){
    const dateA = a.date.split("/").reverse().join("-")
    const dateB = b.date.split("/").reverse().join("-")
    if (dateA>dateB) return 1
    else return -1
}

async function getEntries(token) {
    try {
        const res = await axios.get(BASE_URL + "/home", config(token))
        return res.data.sort(compareFunction)
        
    } catch (error) {
        console.log(error.message)
    }
}

async function delEntry(id,token) {
    await axios.delete(BASE_URL + `/del/${id}`, config(token))
}

const apiEntries = {
    getEntries,
    delEntry
}

export default apiEntries