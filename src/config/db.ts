import mongoose from "mongoose";
const connectDB = async (): Promise<void> => {
    try {
        const mongoUrl = process.env.MONGODB_URI as string;
        await mongoose.connect(mongoUrl);

        console.log("mongoDB connected in localhost:27017/enamad");
    } catch (error) {
        console.log(`MongoDB connection failed due :`, error);
        process.exit(1);
    }
};
export default connectDB