const mongoose = require('mongoose')

const connectDB = async()=>{
mongoose.set('strictQuery',false)
    try {
        await mongoose.connect('mongodb://localhost:27017/user-managment' , {

            useNewUrlParser : true,
            useUnifiedTopology : true ,
            // useFindAndModify : true
        })
        console.log(`Mongo DB connected to Database`)

    } catch (error) {
        console.log('Error in Connection..', error.message)
        process.exit()
        
    }

}

module.exports = connectDB