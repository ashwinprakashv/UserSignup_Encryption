import mongoose from "mongoose";
import {} from 'dotenv/config'

 export const uri = process.env.MONGO_URI;

mongoose.connect(uri,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log("Connected to Mongodb Successfully"))
.catch((err)=>console.log(`Connection Failed due to the error below \n ${err}`))


const userSchema = mongoose.Schema({

    name : {type:String,required:true},
    email : {type:String , required:true},
    pwd   : {type:String , required:true},
})

const userModel = mongoose.model("Delta_User",userSchema)

export default userModel

