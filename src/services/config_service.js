import axios from "axios"
import { useEffect } from "react";


    let token ='';


    if(localStorage?.getItem('USER')){
        token =JSON.parse(localStorage?.getItem('USER'))?.token
    
    }
   




export const http = axios.create({
    baseURL: "https://fiverrnew.cybersoft.edu.vn",
    headers: {
        tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMCIsIkhldEhhblN0cmluZyI6IjAxLzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNTE0ODgwMDAwMCIsIm5iZiI6MTY5ODY4NTIwMCwiZXhwIjoxNzI1Mjk2NDAwfQ.CPY1b9IiMcklQZ9hjqIzrdiOlQ5YnV4VpzGu_yZr7G0",
        token:`${token}`
        
    },
    timeout: 5000
});