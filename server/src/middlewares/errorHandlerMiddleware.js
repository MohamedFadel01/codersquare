import log, { error } from "fancy-log";

const errorHandler = (error, req, res, next) => {
  log.error(error);
  res.sendStatus(error.status);
};

export default errorHandler;
