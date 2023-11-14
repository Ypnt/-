const axios=require("axios")
async function getUser(){
    try{
        const res=await axios.get('https://www.webpackjs.com/');
        console.log(res)
    }catch(error){
        console.error(error)
    }
}
getUser()