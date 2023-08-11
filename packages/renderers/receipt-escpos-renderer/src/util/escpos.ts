import { ChildBuilder, EscPos, ReceiptNodeContext } from '@/types';
import LinkedList from '@/linked-list';
import {
  ChildrenNotAllowedError,
  MissingContextError,
  MissingContextPropertiesError,
} from '@/errors';

/**
 * Require that `context` is defined and has the specified `keys`
 * @param context An object containing context properties
 * @param keys A list of keys to require
 * @throws {MissingContextError} If `context` is undefined
 * @throws {MissingContextPropertiesError} If `context` is missing any of the specified `keys`
 */
export function requireContextKeys<TContext extends ReceiptNodeContext>(
  context?: TContext,
  keys?: (keyof TContext)[]
): asserts context is TContext {
  requireContext(context);

  if (!keys) return;

  const missingKeys: (keyof TContext)[] = [];
  for (const key of keys) {
    if (context[key] === undefined) {
      missingKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    throw new MissingContextPropertiesError(
      `Missing required context keys: ${missingKeys.join(', ')}`
    );
  }
}

/**
 * Require that `context` is defined
 * @param context An object containing context properties
 * @throws {MissingContextError} If `context` is undefined
 */
export function requireContext<TContext extends ReceiptNodeContext>(
  context: TContext | undefined
): asserts context is TContext {
  if (!context) {
    throw new MissingContextError('No context found');
  }
}

/**
 * Throw an error if `children` is defined
 * @param children The children to check
 * @throws {ChildrenNotAllowedError} If `children` is defined
 */
export function disallowChildren(
  children?: ChildBuilder<EscPos>[]
): asserts children is undefined {
  if (children && children.length > 0) {
    throw new ChildrenNotAllowedError('Node does not support children');
  }
}

/**
 * Render `children` and return a single `EscPos` instance
 * @param children The children to render
 * @param context The context to pass to the `children` as they are rendered
 * @returns The rendered children as a single `EscPos` instance
 */
export async function renderChildBytes(
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
): Promise<EscPos> {
  let renderedChildren: EscPos = new LinkedList();
  if (!children) return renderedChildren;
  for (const child of children) {
    const renderedChild = await child(context);
    renderedChildren.appendList(renderedChild);
  }
  return renderedChildren;
}

/**
 * Render `children` and return a list of `EscPos` instances
 * @param children The children to render
 * @param context The context to pass to the `children` as they are rendered
 * @returns The rendered children as a list of `EscPos` instances
 */
export async function renderChildBytesList(
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
): Promise<EscPos[]> {
  let renderedChildren: EscPos[] = [];
  if (!children) return renderedChildren;
  for (const child of children) {
    renderedChildren.push(await child(context));
  }
  return renderedChildren;
}
