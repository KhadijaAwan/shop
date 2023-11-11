import mongoose from "mongoose";

const connection = async () => {
    const connectionUrl = "mongodb+srv://khadijaawan287:GNqGarJgA5RTijPp@cluster0.lhwyotr.mongodb.net/";

    try {
        await mongoose.connect(connectionUrl);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error(error);
    }
};

export default connection;