import { describe, it, assert, expect } from 'vitest';
import { splitLines } from '../../src/util';

describe('splitLines', () => {
  it('should pad spaces to the line length', () => {
    const text = 'Hello World';
    const lines = splitLines(text, 15, 0);

    assert(lines.length === 15);
  });
});
