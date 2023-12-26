import { TypeOf, object, string } from "zod"

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email"),
        password: string(),
    })

});


export type SessionSchema = TypeOf<typeof createSessionSchema>
// export type CreateUserInput = typeof createUserSchema  // TypeOf is used to remove effects of Zod so we can get proper creatUserInputSchema

