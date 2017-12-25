
import bodyParser from 'body-parser';

// import { session } from '../config';

// import { mongodb } from '../services';

// import expressSession from 'express-session';

// import store from 'connect-mongo';
// import store from 'connect-redis';
// import store from 'connect-memcached';

// expressSession({
//   name: session.name,
//   secret: session.secret,
//   resave: session.resave,
//   saveUninitialized: session.saveUninitialized,
//   store: new store({
//     mongooseConnection: mongodb.connection
//   })(expressSession)
// });

export const bodyParserJson = bodyParser.json({
  limit: '512mb'
});

export const enableCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Token, Content-Length, X-Requested-With');
  next();
};

