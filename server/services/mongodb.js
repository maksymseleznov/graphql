import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.set('debug', false);

mongoose.connect('mongodb://russian:76U8bRv4#0Ks1s9$hpf4#Y05@ds227555.mlab.com:27555/russians', {
  useMongoClient: true,
  readPreference: 'secondary',
  w: 1
});

mongoose.connection.on('connected', function() {
  console.log(`Connected to MongoDB`);
});

mongoose.connection.on('error', function(error) {
  console.log(`Connection to MongoDB failed: ${error}`);
});

mongoose.connection.on('disconnected', function() {
  console.log(`Disconnected from MongoDB`);
});

mongoose.connection.on('close', () => {
  console.log(`MongoDB connection closed`);
});

export default mongoose;
