import axios from "axios"

export const postRequest = async (path, body) => {
    try {
        return await axios.post(`${process.env.REACT_APP_URL_API}/${path}`, body)
    } catch (e) {
        throw e
    }
}

export const putRequest = async (path, body) => {
    try {
        return await axios.put(`${process.env.REACT_APP_URL_API}/${path}`, body)
    } catch (e) {
        throw e
    }
}

export const getRequest = async (path) => {
    try {
        return await axios.get(`${process.env.REACT_APP_URL_API}/${path}`)
    } catch (e) {
        throw e
    }
}

export const deleteRequest = async (path) => {
    try {
        return await axios.delete(`${process.env.REACT_APP_URL_API}/${path}`)
    } catch (e) {
        throw e
    }
}