import ApiError from "./ApiError.js";

async function AsyncHandler(subFun) {
  return async (req, res, next) => {
    try {
      return await subFun(req, res, next);
    } catch (error) {
      next(
        new ApiError(
          501,
          "Something wrong with server, the process is returned with ERROR.",
          error
        )
      );
    }
  };
}

export default AsyncHandler;
