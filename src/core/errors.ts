export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParseError';
  }
}

export class MultipleRootError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MultipleRootError';
  }
}
