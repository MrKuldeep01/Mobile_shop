class ApiError extends Error {
  constructor(statusCode, message="Error occured in the process!", errors=[],errorStack="") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.data = null;
    this.success = false;
    errorStack ? this.errorStack = errorStack : Error.captureStackTrace()
  }
}

const result = new ApiError(200,"message is shown as this like error...");
export default ApiError