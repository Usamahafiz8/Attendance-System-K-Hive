import axios from "axios";


const token  : string = "";
const Custon_Axios = axios.create({
baseURL : import.meta.env.VITE_BASE_URL,
headers: {
    Authorization : "Bearer" + token,
    Accept: "*/*",
    "Contect-Type" : "application/json"
},
timeout: 500000,

})

export default Custon_Axios;