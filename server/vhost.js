// vhosts.js

export default (host, app) => (req, res, next) => {
  if (host === req.headers.host.split(":")[0]) {
    app(req, res, next);
  } else {
    next();
  }
};