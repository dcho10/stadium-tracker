// Set up Mongoose connection
const mongoose = require("mongoose");

// Connect to the MongoDB URI from environment variable or fallback to localhost
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/visitor_DB';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(`Connected to MongoDB at ${mongoURI}`))
.catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;
