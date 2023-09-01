export class BaseError extends Error {
  public errorText: string;
  public isWork: boolean;

  constructor(errorText: string, content: string, isWork: boolean) {
    super(content);
    Object.setPrototypeOf(this, new.target.prototype);
    this.errorText = errorText;
    this.isWork = isWork;
    Error.captureStackTrace(this);
  }

  static isError(error: unknown): boolean {
    if (error instanceof BaseError) {
      return error.isWork;
    }
    return false;
  }
}
