
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const path = require('path');

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const uri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(uri, mongooseOptions);
const db = mongoose.connection;

db.once('open', async function () {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  mongoose.wysa = mongoose.createConnection(uri, mongooseOptions);

  global.wysa = {client : client};

  require('./models'); 
  const setupExpress = require('./express');
  const app = setupExpress();
  const port = process.env.PORT || 2356;
  const server = app.listen(port);

  // console.info('Connected to db', config.db);
  console.info('Application started on port', port);
});