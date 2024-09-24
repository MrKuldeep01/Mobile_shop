import ApiError from "./ApiError.js";

function AsyncHandler(subFun) {
  return async (req, res, next) => {
    try {
      return await subFun(req, res, next);
    } catch (error) {
      console.log(error)
      next(
        new ApiError(
          error.statusCode || 501,
          error.message || "Something wrong with server, the process is returned with ERROR.",
          error
        )
      );
    }
  };
}

export default AsyncHandler;
