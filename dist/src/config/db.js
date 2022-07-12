import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
var Pool = pg.Pool;
var connection = new Pool({
    connectionString: process.env.DATABASE_URL
});
// if (process.env.MODE === "PROD") {
//   connection.ssl = {
//     rejectUnauthorized: false
//   };
// }
console.log("connected");
export default connection;
