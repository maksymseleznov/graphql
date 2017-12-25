
import request from 'request';

import users from './users';

const index = (req, res, next) => {
  if (req.session.user) {
    res.render('index');
  } else {
    res.redirect('/sign-in');
  }
};

const signIn = (req, res, next) => {
  res.render('sign-in');
};

const signOut = (req, res, next) => {
  req.session.destroy();
  res.redirect('/sign-in');
};

const loginRequired = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/sign-in');
  }
};

const authentication = (req, res, next) => {

  const json = req.body;

  console.log(json);

  // const options = {
  //   method: 'POST',
  //   url: ((config.ssl) ? 'https': 'http') + '://' + config.domains.empirecitylabs.api + '/v0/clients/authorization',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   json: json,
  // };

  // request(options, (err, response, body) => {
  //   if(!err && response.statusCode === 200){
  //     req.session.user = {}
  //     res.status(200).json({ redirect: '/' });
  //   } else {
  //     res.status(response.statusCode).json({});
  //   }
  //   next();
  // });
};

export default { index, signIn, signOut, loginRequired, authentication, users };