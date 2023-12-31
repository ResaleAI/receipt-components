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

export class EmptyRootError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmptyRootError';
  }
}

export class MissingTextLiteralNodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingTextLiteralNodeError';
  }
}