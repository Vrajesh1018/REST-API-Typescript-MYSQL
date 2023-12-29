import mysql from "mysql2/promise";

import { ResultSetHeader } from "mysql2";

export interface Session {
    user: string,
    valid: boolean,
    userAgent: string
}

export interface SessionRow extends Session, ResultSetHeader {
    createdAt: Date,
    updatedAt: Date
}

export default class SessionModel {
    
    private connection: mysql.Connection;
    
    constructor(connection: mysql.Connection) {
        this.connection = connection;
    }

    async create(session : Session): Promise<SessionRow> {

        const createdAt = new Date();
        const updatedAt = new Date();

        // please make a note here we are working in SQL so foreign key must be primary key and hence user is nothing but our email

        const sql = 'INSERT INTO sessions(user,valid,userAgent,createdAt,updatedAt) values (?,?,?,?,?)'
        const values = [session.user, true, session.userAgent, createdAt, updatedAt];

      
        const [result] = await this.connection.execute(sql, values);   // here execute returns two things [result,fields] in results it's contains array of all the entries in JSON format and in fields it's contains metadata for table 

        // for this I need to make id as primary key to make is as autoincrement and if I make it's as autoincrement then email will not be my primary  key so same email can be inserted !!
        // so what I had done is fire a query for finding record based on email 
        const [userRows] = await this.connection.execute<SessionRow[]>(
            'SELECT * FROM sessions WHERE user = ?',
            [session.user]
        );

        // This is working because UserRow extends ResultSetHeader !!! other wise we constantly getting type error of not define OkPacket and RowDatapacket error and in newer version We need to use this ResultSetHeader


        // Return the first (and only) user row from the SELECT query
        return userRows[0];
        
    }

    async find(user: string): Promise<SessionRow[] | null> {
        
        const [userRows] = await this.connection.execute<SessionRow[]>(
            'SELECT * FROM sessions WHERE user = ? and valid = true',
            [user]
        );

        // Return the first (and only) user row from the SELECT query
        return userRows;
        
    }

    async update(user: string): Promise<SessionRow | null> {


        // set valid to false for session
        const [result] = await this.connection.execute("update sessions set valid = false where user = ?",[user]);   // here execute returns two things [result,fields] in results it's contains array of all the entries in JSON format and in fields it's contains metadata for table 
       
        return null;
    }
    
}
