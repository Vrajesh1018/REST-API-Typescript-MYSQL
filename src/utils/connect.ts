// import mysql, { Pool,PoolConnection } from "mysql2/promise";
// import config from "config";
// import logger from "./logger";

// async function connect():Promise<PoolConnection> {
//     // const connection: Connection = mysql.createConnection({
//     //     host: config.get("dbHost"),
//     //     user: config.get("dbUser"),
//     //     password: config.get("dbPassword"),
//     //     database: config.get("dbName")
//     // });
    

//     connection.connect((err:any)=>{
//         if(err){
//             logger.error("Error connecting to database");
//             console.log(err);
            
//             return;
//         }
//         logger.info("Connected to database");

//     });

//     return connection;
// }

// export default connect;

import mysql, { Pool, PoolConnection } from 'mysql2/promise';  // Adjust the import path

import config from 'config';
import logger from './logger';

interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}


async function connect(): Promise<PoolConnection> {
    const dbConfig: DatabaseConfig = {
        host: config.get('dbHost'),
        user: config.get('dbUser'),
        password: config.get('dbPassword'),
        database: config.get('dbName'),
      };

  const pool: Pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  try {
    const connection = await pool.getConnection();
    logger.info('Connected to database');
    return connection;
  } catch (err) {
    logger.error('Error connecting to database:', err);
    throw err;  // Rethrow the error for handling at a higher level
  }
}

export default connect;
