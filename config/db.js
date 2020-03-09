const mongoose = require('mongoose');
 
const dbURI = 'mongodb+srv://admin:admin123@cluster0-dvbv1.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}); 

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Successfully connected!');
}); 
  
// If the connection throws an error
mongoose.connection.on('error', (err) => { 
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', () => { 
  console.log('Mongoose connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', () => {   
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 