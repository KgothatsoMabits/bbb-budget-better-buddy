const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({ 
    name: {
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:30
    },
    surname:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:30
    },
    cellphoneNumber:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        match: /^\S+@\S+\.\S+$/
    },
    password:{
        type:String,
        required:true,
        trim:true
    }

 },{timestamps:true});

module.exports = mongoose.model('User', UserSchema);

