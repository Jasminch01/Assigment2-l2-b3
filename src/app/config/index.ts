import dotenv from "dotenv";

dotenv.config()


export default {
    port : process.env.PORT,
    dburl : process.env.DB_URL,

}