import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error(
        "Please define the MONGODB_URI env variable inside the .env<development/production>.local"
    );
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`Connected to db in ${NODE_ENV}`);
    } catch (error) {
        console.error("Error connecting to database: ", error);

        // eslint-disable-next-line no-undef
        process.exit(1);
    }
};

export default connectToDatabase;
