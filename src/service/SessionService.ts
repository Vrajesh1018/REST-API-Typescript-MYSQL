import SessionModel from "../models/Session";
import connect from "../utils/connect";
import { SessionRow } from "../models/Session";
import logger from "../utils/logger";

export async function createSession(userId:string,userAgent:string) : Promise<SessionRow>
{
    // here our userId must be email because we are working in MySQL database

    console.log(userId);
    console.log(userAgent);
    

    const connection = await connect();

    const newSession = new SessionModel(connection);

    const session = await newSession.create({user:userId,valid:true,userAgent});

    return session;

}

export async function findSession(user:string) : Promise<SessionRow[] | null>
{

    const connection = await connect();

    const newSession = new SessionModel(connection);

    const session = await newSession.find(user);  // here our id is actually email ...

    return session;
}

export async function updateSession(id:string) : Promise<SessionRow | null>
{
    const connection = await connect();
    const newSession = new SessionModel(connection);
    const session = await newSession.update(id);
    
    return session;

}