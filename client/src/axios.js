import axios from "axios"

const instance = axios.create({
    baseURL: "https://gym-depot.herokuapp.com/",
})

export default instance