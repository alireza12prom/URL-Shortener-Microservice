export class RabbitRpcException extends Error {
  public readonly name = 'RabbitRpcException';
  public readonly code: string;
  constructor(reason: string, code: string) {
    super(reason);
    this.code = code;
  }

  getError() {
    return { reason: this.message, code: this.code };
  }
}
