type ServerErrorType = {
  message: string;
  code?: number;
};

export class ServerError extends Error {
  statusCode?: number;

  constructor({ message, code }: ServerErrorType) {
    super(message);
    if (code) this.statusCode = code;
    this.name = "ServerError";
  }
}
