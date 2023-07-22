import { TextLiteralNodeProps } from '@/core/node-builders/text-literal';
import { EscPos } from './types';

async function renderTextLiteral({
  text,
}: TextLiteralNodeProps): Promise<EscPos> {
  return Buffer.from(text);
}

export default renderTextLiteral;
