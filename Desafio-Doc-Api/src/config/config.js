import dotenv from "dotenv";

dotenv.config()

const config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret_key: process.env.SECRET_KEY_JWT,
  gmail_user: process.env.GMAIL_USER,
  gmail_password: process.env.GMAIL_PASSWORD,
  /* google_client_id: process.env.GOOGLE_CLIENT_ID, */
};

export {config}