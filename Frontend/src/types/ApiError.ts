class ApiError<T = any> extends Error {
  code: number;
  payload: T;
  response: T;
  parameters: any;

  constructor(endpoint: string, response: Response, body: any) {
    super(response.statusText);
    this.name = `[${response.status}] - ${endpoint}`;
    Object.setPrototypeOf(this, ApiError.prototype);
    this.code = response.status;
    this.payload = body;
    this.response = body;
  }
}

export default ApiError;
