import { Request,Response,NextFunction } from "express"
import { AnyZodObject } from "zod";
import log from "../utils/logger";

// this technique is called currying !! 
const validateResource = (schema:any) => (req:Request,res:Response,next:NextFunction) =>{

    try{

        schema.parse({
            body:req.body,
            query:req.query,
            params:req.params
        })

        next();
    }

    catch(e:any)
    {
        log.error(e.message); 
        return res.status(400).send(e.err);
    }
}

export default validateResource;