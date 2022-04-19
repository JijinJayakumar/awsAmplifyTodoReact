const successResponse = (res, { data, message, statusCode = 200 }) => {
  res.status(statusCode || 200).json({
    status: true,
    data: data,
    message: message,
  });
};

const errorResponse = (res, { data, message, statusCode = 401 }) => {
  res.status(statusCode || 401).json({
    status: false,
    data: data,
    message: message,
  });
};


module.exports = {
  successResponse,
  errorResponse,
};
