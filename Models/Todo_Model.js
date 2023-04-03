const mongoose = require('mongoose');

const user_Schema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    priority:{
        type:String,
        require:true
    },
    
        
},{ timestamps: true })
user_Schema.set('timestamps', true);
const User = mongoose.model('User' , user_Schema);
module.exports = {
    User
}