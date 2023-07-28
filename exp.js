const mongoose = require('mongoose');

// const connectionURI = "mongodb+srv://H-R-2004:H@rshil.2004@cluster0.rq9g8s2.mongodb.net/hr?retryWrites=true&w=majority";
// const connectionURI = "mongodb+srv://H-R-2004%3AH%40rshil.2004@cluster0.rq9g8s2.mongodb.net/hr?retryWrites=true&w=majority";
const DB = "mongodb+srv://harshil:ruOyhwBe1uzf4wlp@cluster0.e9gptrp.mongodb.net/hr?retryWrites=true&w=majority"



mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas!');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});