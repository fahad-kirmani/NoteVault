
const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://fahadki509:fahadk509@cluster0.norc5li.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo=async ()=>{
    await mongoose.connect(mongoURI)
    console.log("connected to MongoDB");
}


module.exports = connectToMongo;
