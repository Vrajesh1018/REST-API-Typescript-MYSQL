import { Request,Response,NextFunction } from "express"
import { get } from "lodash"
import { verifyJwt } from "../utils/jwt";

const deseializeUser = (req:Request,res:Response,next:NextFunction)=>{

    const accessToken = get(req,"headers.authorization","").replace(/^Bearer\s/,"");
    const refreshToken = get(req,"headers.x-refresh");

    console.log("Hii I am from deseralize user ...");

    console.log(accessToken);
    console.log(refreshToken);

    if(!accessToken){
        return next();
    }

    const {decoded,expired} = verifyJwt(accessToken);

    if(decoded){
        res.locals.user = decoded;

        console.log(decoded);
        
        return next();
    }
    
    if(expired && refreshToken){
        return next();
    }


}

export default deseializeUser;