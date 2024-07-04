import axios from "axios"

export const getLocalities = async () => {
    try {
        const localities = await axios.get("http://localhost:3000/localities")
        if(localities.status == 200) {
            return {status:true,localities:localities.data}
        } else {
            return {status:false,error:"Unexpected Error"}
        }
    } catch (error) {
        return {status:false,error:error.message}
    }
}