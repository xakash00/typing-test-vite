import axios from "axios"


export const get_all_products_api = async () => {
    const response = await axios.get("https://random-word-api.herokuapp.com/word?number=60")
    // const data = await response.json()
    return response
}