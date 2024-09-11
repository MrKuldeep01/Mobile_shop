class ApiResponse {
  constructor(
    statusCode = 200,
    message = "Success is achived in the process.",
    data = {},
    success = "true",
  ) {
    this.statusCode = statusCode;
    this.message = message;
    if (data) {
      this.data = data;
    }
    this.success = statusCode > 99 && statusCode < 400 ;
  }
}

export default ApiResponse;