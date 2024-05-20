export class InvalidRendererError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "InvalidRendererError";
  }
}
