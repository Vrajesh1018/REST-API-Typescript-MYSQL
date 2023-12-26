import  jwt from "jsonwebtoken";
import config from "config";
import fs from "fs";


// const privateKey = config.get<string>("privateKey");
// const publicKey = config.get<string>("publicKey");

export function signJwt(Object:Object,expiresIn:string,options?:jwt.SignOptions | undefined){

    // console.log(Object);
    // console.log("From signJWT printing email : "+Object.email);
    console.log(expiresIn);

    // The most important and continuosly I am facing error is Object.assign is not a function .. It's simply telling that sprad operator is not longer used for combining JSON like ...options no longer used !!!

    // const mergedOptions = Object.assign({},options,{ algorithm:"RS256"});

    const privateKey = fs.readFileSync("./config/privateKey.pem","utf-8");
    const publicKey = fs.readFileSync("./config/publicKey.pem","utf-8");

    // console.log(privateKey);
    // console.log(publicKey);

    // const token = jwt.sign(Object,privateKey,{
    //     algorithm:"RS256",
    //     expiresIn:"15m"
    // });
    const token = jwt.sign(Object,privateKey,{
        algorithm:"RS256",
        expiresIn:expiresIn,
    });
    
    // console.log(token);

    return token;
}
            
export function verifyJwt(token : string){
    try { 
        
        const publicKey = fs.readFileSync("./config/publicKey.pem","utf-8");

        const decoded = jwt.verify(token,publicKey);    

        return {
            valid:true,
            expired:false,
            decoded
        }

    } catch (error:any) {
        return {
            valid:false,
            expired:error.message === "jwt expired",
            decoded:null
        }
    }
}

