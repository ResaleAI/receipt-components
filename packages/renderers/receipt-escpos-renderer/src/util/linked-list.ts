import { ILinkedList, LinkedListNode } from '../types';

class LinkedList<TData> implements ILinkedList<TData> {
  length: number;
  head: LinkedListNode<TData> | null;
  tail: LinkedListNode<TData> | null;

  constructor(arr: TData[] = []) {
    this.length = 0;
    this.head = null;
    this.tail = null;
    for (const item of arr) {
      this.append(item);
    }
  }

  append(data: TData) {
    const node: LinkedListNode<TData> = {
      data,
      next: null,
      prev: null,
    };
    if (this.tail) {
      this.tail.next = node;
      node.prev = this.tail;
    }
    this.tail = node;
    if (!this.head) {
      this.head = node;
    }
    this.length++;
  }

  prepend(data: TData) {
    const node: LinkedListNode<TData> = {
      data,
      next: null,
      prev: null,
    };
    if (this.head) {
      this.head.prev = node;
      node.next = this.head;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.length++;
  }

  appendList(list: LinkedList<TData>) {
    if (!list.head) return this;
    if (this.tail) {
      this.tail.next = list.head;
      list.head.prev = this.tail;
    }
    this.tail = list.tail;
    if (!this.head) {
      this.head = list.head;
    }
    this.length += list.length;

    return this;
  }

  prependList(list: LinkedList<TData>) {
    if (!list.tail) return this;
    if (this.head) {
      this.head.prev = list.tail;
      list.tail.next = this.head;
    }
    this.head = list.head;
    if (!this.tail) {
      this.tail = list.tail;
    }
    this.length += list.length;
    return this;
  }

  toUint8Array(): Uint8Array {
    if (!this.head) return new Uint8Array(0);
    const buffer = Buffer.alloc(this.length);
    let node = this.head;
    let i = 0;
    while (node) {
      if (!isNumber(node.data)) {
        throw new Error(
          'LinkedList must contain numbers to convert to Uint8Array'
        );
      }
      buffer[i++] = node.data;
      if (!node.next) break;
      node = node.next;
    }
    return buffer;
  }

  static fromString(str: string) {
    const arr = str.split('').map((char) => char.charCodeAt(0));
    return new LinkedList(arr);
  }
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export default LinkedList;
