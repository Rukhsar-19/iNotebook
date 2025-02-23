const mongoose=require('mongoose');
// const mongoURI="mongodb://localhost:27017"
const connectToMongo = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/inotebook', {
        // useNewUrlParser: true,
        //  useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB successfully!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  };
  
  module.exports = connectToMongo;