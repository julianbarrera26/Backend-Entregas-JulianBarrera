import dotenv from "dotenv";

dotenv.config()

export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  secret_jwt: process.env.SECRET_KEY_JWT,
  /* google_client_id: process.env.GOOGLE_CLIENT_ID, */
};