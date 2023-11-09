const response = (statusCode, message, res, data = null) => {
   if (statusCode >= 400 && statusCode < 500) {
      return res.status(statusCode).json({
         status: false,
         message,
         errors: data,
      });
   }

   if (statusCode === 200) {
      return res.status(statusCode).json({
         status: true,
         message,
         payload: data,
      });
   }
};

module.exports = response;
