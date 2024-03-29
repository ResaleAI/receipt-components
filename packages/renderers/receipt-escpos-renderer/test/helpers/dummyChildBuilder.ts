import LinkedList from '@/linked-list';
import { EscPos } from '@/types';

export default async function dummyChildBuilder(
  ctx?: ReceiptNodeContext
): Promise<EscPos> {
  return new LinkedList<number>([1, 2, 3]);
}
