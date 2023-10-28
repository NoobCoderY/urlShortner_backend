import mongoose from "mongoose"




//**********************************MongoDb DataBase Connect logic*********************************/
export const dbConnection = async () => {
    await mongoose.connect(process.env.MONGO_URI as string).then((data) => {
        console.log(`database Connected`);         
    })
}


  
