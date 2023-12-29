import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import { ResultSetHeader } from "mysql2";

export interface UserInput {
    email: string,
    name: string,
    password: string
}

export interface UserRow extends UserInput, ResultSetHeader {
    createdAt: Date,
    updatedAt: Date
}

export default class UserModel {
   
    
    private connection: mysql.Connection;

    constructor(connection: mysql.Connection) {
        this.connection = connection;
    }

    async createUser(userInput: UserInput): Promise<UserRow> {

        const { email, name, password } = userInput;

        const hashedpassword = await bcrypt.hash(password, 10);

        // log.info(hashedpassword);

        const createdAt = new Date();
        const updatedAt = new Date();

        const sql = 'INSERT INTO users(email,name,password,createdAt,updatedAt) values (?,?,?,?,?)'
        const values = [email, name, hashedpassword, createdAt, updatedAt];

        // log.info(sql);
        // log.info(values);
        const [result] = await this.connection.execute(sql, values);   // here execute returns two things [result,fields] in results it's contains array of all the entries in JSON format and in fields it's contains metadata for table 

        // log.info(result);

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // I am facing insertId doest not exists in typescript but it's work perfectly wihout error !!
        
        // for this I need to make id as primary key to make is as autoincrement and if I make it's as autoincrement then email will not be my primary  key so same email can be inserted !!
        // so what I had done is fire a query for finding record based on email 
        // const [userRows] = await this.connection.execute<UserRow[]>(
            // 'SELECT * FROM users WHERE email = ?',
            // [email]
            // );
            
            // This is working because UserRow extends ResultSetHeader !!! other wise we constantly getting type error of not define OkPacket and RowDatapacket error and in newer version We need to use this ResultSetHeader
            
            
            // Return the first (and only) user row from the SELECT query
            // return userRows[0];
            // log.info(result.insertId);
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // return result;


        return this.findUser(email);
    }

    async findUser(email: string): Promise<UserRow> {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [result] = await this.connection.execute<UserRow[]>(sql, [email]);
        return result[0];
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {

        return await bcrypt.compare(password, hashedPassword);
    }

    async getAllUsers(): Promise<UserRow[]> {
        const sql = 'SELECT * FROM users';

        const [result] = await this.connection.execute<UserRow[]>(sql);

        return result;
    }

    async updateUser(input: UserInput) {

        // console.log(input);

        const { email,name, password } = input;  // make a note we need to create different function for updating password here we only update name 

        const sql = 'UPDATE users SET name = ? WHERE email = ?';

        const [result] = await this.connection.execute<UserRow[]>(sql, [name, email]);

        return this.findUser(email);

    }

    async deleteUser(email: string) {

        // step 1 we need to delete all the sessions of that user 
        let sql = 'DELETE FROM sessions WHERE user = ?';
        let [result] = await this.connection.execute<UserRow[]>(sql, [email]);


        // step 2 then we are allowed to delete the user

         sql = 'DELETE FROM users WHERE email = ?';

        const deletedUser = await this.findUser(email);

        // console.log(deletedUser);

         [result] = await this.connection.execute<UserRow[]>(sql, [email]);


        return deletedUser;
    }
}