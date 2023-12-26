import { Express,Request,Response } from "express";
import { createUserHandler, deleteUserHandler, getAllUsersHandler, getUserHandler, updateUserHandler } from "./controller/UserController";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/UserSchema";  // used for validating User schema that's comes from request
import { createSessionSchema } from "./schema/SessionSchema";
import { createUserSessionHandler, getAllUserSessionHandler } from "./controller/SessionController";

function routes(app:Express)
{
    app.get("/healthcheck",(req:Request,res:Response) => {
        res.sendStatus(200);
    });

    app.post("/api/users",validateResource(createUserSchema),createUserHandler);

    
    app.get("/api/users",getAllUsersHandler);
    
    app.get("/api/users/:email",getUserHandler);
    
    app.put("/api/users",updateUserHandler);
    
    app.delete("/api/users",deleteUserHandler);
    

    app.post("/api/sessions",validateResource(createSessionSchema),createUserSessionHandler);

    app.get("/api/sessions",getAllUserSessionHandler);
}

export default routes;