import { omit } from "lodash";

import { UserInput, UserRow } from "../models/User";
import UserModel from "../models/User";
import connect from "../utils/connect";
import log from "../utils/logger";

export async function createUser(input: UserInput) {
    try {

        const connection = await connect();

        const newUser = new UserModel(connection);

        log.info(input);

        // log.info(newUser);

        return await newUser.createUser(input);

    } catch (error: any) {
        throw new Error(error);
    }
}

export async function validatePassword({ email , password }: { email: string, password: string }) : Promise<any> {

    log.info(email);
    
    const connection = await connect();

    const newUserModel = new UserModel(connection);

    const user = await newUserModel.findUser(email);

    // log.info(user);
    

    if(!user)
    return false;


    const isValid = await newUserModel.comparePassword(password, user.password);
    

    if(!isValid)
    return false;


    return omit(user,password);

}

export async function getAllUsers() : Promise<UserRow[]> {

    const connection = await connect();

    const newUserModel = new UserModel(connection);

    const users = await newUserModel.getAllUsers();

    return users;
}

export async function getUser(email:string) : Promise<UserRow>{

    const connection = await connect();

    const newUserModel = new UserModel(connection);

    const user = await newUserModel.findUser(email);

    return user;
}

export async function updateUser(input:UserInput) : Promise<UserRow>{
    const connection = await connect();

    const newUserModel = new UserModel(connection);

    const updatedUser = await newUserModel.updateUser(input);
    
    return updatedUser;
}

export async function deleteUser(input:UserInput) : Promise<UserRow>{
    const connection = await connect();

    const {email} = input;
    
    console.log(email);


    const newUserModel = new UserModel(connection);

    const deletedUser = await newUserModel.deleteUser(email);

    // console.log(deletedUser);
    
    return deletedUser;
}