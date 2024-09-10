type ClientErrorType = {
  message: string;
  code: number;
};

export class ClientError extends Error {
  statusCode: number;

  constructor({ message, code }: ClientErrorType) {
    super(message);
    this.statusCode = code;
    this.name = "ClientError";
  }
}
