export class InvalidNodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnrecognizedNodeError';
  }
}

export class MissingContextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingContextError';
  }
}

export class MissingContextPropertiesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingContextKeysError';
  }
}

export class ChildrenNotAllowedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChildrenNotAllowedError';
  }
}
