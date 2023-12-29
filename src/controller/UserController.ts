import { Request,Response, response } from "express";
import logger from "../utils/logger";
import { createUser, getAllUsers, getUser, updateUser,deleteUser } from "../service/UserService";
import { CreateUserInput } from "../schema/UserSchema";
import { omit } from "lodash";
import { UserInput, UserRow } from "../models/User";

//request<{paramas}, {responseBody},{schema}>

export async function createUserHandler(req:Request<{},{},CreateUserInput["body"]>,res:Response){

    try {
        const user = await createUser(req.body)// call create User Service

        // return res.send(user);  // to omit password use Omit password
        return res.send(omit(user,"password"));
        
    } catch (error) {
        logger.error(error);
        return res.status(409).send(error);
        
    }

}

export async function updateUserHandler(req:Request,res:Response){

    try {
       
        // console.log(req.body);
        
        const updatedUser = await updateUser(req.body);

        return res.send(omit(updatedUser,"password"));
    } catch (error) {
        logger.error(error);

        return res.status(409).send(error);
    }
}

export async function deleteUserHandler(req:Request,res:Response){

    try{

        // console.log(req.body);

        const deletedUser = await deleteUser(req.body);

        console.log(deletedUser);

        if(!deletedUser){
            return res.status(404).send("User not found");
        }

        return res.status(200).send(omit(deletedUser,"password"));

    }
    catch(error){
        logger.error(error);

        return res.status(500).send(error);
    }
}

export async function getUserHandler(req:Request,res:Response){

    try {

        const {email} = req.params;

        const user = await getUser(email);
        
        if(!user){
            return res.status(404).send("User not found");
        }

        return res.status(200).send(omit(user,"password"));

    } catch (error) {
        logger.error(error);

        return res.status(500).send(error);
    }
}

export async function getAllUsersHandler(req:Request,res:Response){

    try {
        const users:UserRow[] = await getAllUsers();

        return res.status(200).send(users.map(user=>omit(user,"password")));

    } catch (error) {
        logger.error(error);
        return res.status(500).send(error);
    }
}

