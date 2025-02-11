import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB CONNECT successfully...")

    } catch (error) {
        console.log("ERROR : " ,error)
        process.exit(1);
    }
}

export default connectDB