import { Schema, model } from "mongoose"; 

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        defaultValue:"John Doe",
    },
    email:{
        type:String,
        required:true,
        defaultValue:"test@email.com",
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    updatedAt:Date,
    createdAt:Date
})
export const UserModel=model("user",userSchema)