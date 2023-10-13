import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    username : {
        type : String,
        requried : [ true, 'Username is requried' ],
        unique: true,
        trim : true
    },
    email : {
        type : String,
        requried : [ true, 'User email is requried' ],
        trim : true,
        unique : true
    },
    password : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true,
    }


}, {
    timestamps : true
});


// export default students model
export default mongoose.model( 'User', userSchema )