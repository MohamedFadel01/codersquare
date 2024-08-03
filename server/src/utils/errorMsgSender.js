const errorMsgSender = (res, statusCode, msg) => {
  res.status(statusCode).json({ msg });
};

export default errorMsgSender;
