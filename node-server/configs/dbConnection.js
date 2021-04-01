import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log(`Mongodb connected : '${conn.connection.host}: ${conn.connection.port}'`);
    } catch (error) {
        console.log(`Error in connecting MongoDB : ${error.message}`);
    }
};

export default connectDB;

