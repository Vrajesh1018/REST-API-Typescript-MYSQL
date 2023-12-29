import config from "config";
import { Request,Response } from "express";
import { validatePassword } from "../service/UserService";
import { createSession,findSession, updateSession } from "../service/SessionService";
import { signJwt } from "../utils/jwt";
import logger from "../utils/logger";

export async function createUserSessionHandler(req:Request,res:Response){
    
    // our tasks are ...
    //log.info("Okk so we are above step 1 in createUserSessionHandler function ....");
    
    // log.info(req.body);
    // console.log(req.body);
    

    // step 1 : Validate the user's password
    const user = await validatePassword(req.body);
    
    if(!user){
       return res.status(401).send("Invalid email or password");
    }


    // step 2 : create Session
    const session = await createSession(req.body.email,req.get("user-agent") || "");

    // step 3 : create access token
    const accessToken = signJwt({...user,session},"15m");  // 15min

    logger.info(accessToken);

    // step 4 : create refresh token
    const refreshToken = signJwt({...user,session},"1y");  // 1year


    // step 5 : send response
    return res.send({accessToken,refreshToken});

}

export async function getAllUserSessionHandler(req:Request,res:Response){
    
    console.log(res.locals.user);

    const user = res.locals.user.email;  // here we need to extract email 

    const sessions = await findSession(user);

    return res.send(sessions);
    
}

export async function deleteUserSessionHandler(req:Request,res:Response){
    const sessionId = res.locals.user.session;

    const email = res.locals.user.email;


    const session = await updateSession(email);

    return res.send(
        {
            acessToken:null,
            refreshToken:null
        });
}
