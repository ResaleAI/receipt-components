import { ChildBuilder, EscPos, ReceiptNodeContext } from '../types';

export const bytes = {
  ESC: 0x1b,
  LF: 0x0a,
  NUL: 0x00,
  GS: 0x1d,
} as const;

// maybe unneeded
export const isNumber2dArray = (value: unknown): value is number[][] => {
  return (
    value instanceof Array &&
    value.every(
      (row) =>
        row instanceof Array && row.every((col) => typeof col === 'number')
    )
  );
};

// maybe unneeded
export const isUint8Array = (value: unknown): value is Uint8Array[] => {
  return (
    value instanceof Array && value.every((row) => row instanceof Uint8Array)
  );
};

export const flattenEscPos = (children?: EscPos[]): EscPos => {
  if (!children) {
    return [];
  }
  return children.reduce((a, b) => [...a, ...b], [] as number[]);
};

export async function renderChildBytesAsList(
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) {
  if (!children) return [];
  let renderedChildren: EscPos[] = [];
  for (const child of children) {
    renderedChildren.push(await child(context));
  }

  return renderedChildren;
}

export async function renderChildBytes(
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) {
  const childBytes = await renderChildBytesAsList(children, context);
  return flattenEscPos(childBytes);
}

export const charToByte = (char: string): number => {
  if (char.length !== 1) {
    throw new Error('charToByte only accepts a single character');
  }
  return char.charCodeAt(0);
};

export const parseBraces = (bracefulStr: string, data: any) => {
  const filledContent = bracefulStr.replace(
    /\{\s*(\w+)\s*\}/g,
    (_match, key) => {
      if (!data[key]) {
        return `{ ${key} }`;
      }
      return `${data[key]}`;
    }
  );
  return filledContent;
};

export const populateChildren = (templateStr: string, children: string[]) => {
  return templateStr.replace(/\{\s*children\s*\}/g, () => {
    return children.join('');
  });
};

export function duplicateContext<TContext extends ReceiptNodeContext>(
  context: TContext
) {
  if (!context) return context;
  return JSON.parse(JSON.stringify(context));
}

/**
 * Asserts that a context is not null or undefined and returns a copy of it
 * @param context The context to assert
 * @returns A copy of the context
 */
export function assertContext<TContext extends ReceiptNodeContext>(
  context?: TContext
): TContext {
  if (!context) throw new Error('Context is required to render this receipt.');
  return duplicateContext(context);
}

export function splitLines(text: string, lineLength: number, offset: number) {
  let lines: string[] = [];
  let line = '';
  lineLength = lineLength - offset;
  for (const word of text.split(' ')) {
    if (line.length + word.length > lineLength) {
      lines.push(line);
      line = '';
    }
    line += word + ' ';
  }
  lines.push(line);
  return lines.join('\n');
}
