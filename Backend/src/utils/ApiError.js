class ApiError extends Error {
  constructor(statusCode, message="Error occured in the process!", errors=[],errorStack="") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.data = null;
    this.success = false;
    errorStack ? 
    (this.errorStack = errorStack) :
    Error.captureStackTrace(this,this.constructor)
  }
}

export default ApiError