import LinkedList from '@ep/linked-list';
import { EscPos } from '@ep/types';

export default async function dummyChildBuilder(
  ctx?: RC.ReceiptNodeContext
): Promise<EscPos> {
  return new LinkedList<number>([1, 2, 3]);
}
