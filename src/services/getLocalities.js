import apiService from "./apiCalling"

export const getLocalities = async () => {
    try {
        const localities = await apiService.get("/localities")
        if(localities.status == 200) {
            return {status:true,localities:localities.data}
        } else {
            return {status:false,error:"Unexpected Error"}
        }
    } catch (error) {
        return {status:false,error:error.message}
    }
}