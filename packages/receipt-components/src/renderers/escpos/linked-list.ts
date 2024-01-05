import { ILinkedList, LinkedListNode } from './types';

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

  // creates an exclusive sublit
  subList(startNode: LinkedListNode<TData>, endNode: LinkedListNode<TData>) {
    const list = new LinkedList<TData>();
    let node = startNode;
    while (node) {
      if (node === endNode) break;
      if (node === this.tail) throw new Error('endNode not found');
      list.append(node.data);
      node = node.next!; // always defined because of the above check
    }
    return list;
  }

  insertListBefore(list: LinkedList<TData>, node: LinkedListNode<TData>) {
    if (!list.head || !list.tail) return this;
    if (!this.head || !this.tail) {
      this.head = list.head;
      this.tail = list.tail;
      this.length += list.length;
      return this;
    }
    if (node.prev) {
      node.prev.next = list.head;
      list.head.prev = node.prev;
    }
    node.prev = list.tail;
    list.tail.next = node;
    this.length += list.length;
    if (node === this.head) {
      this.head = list.head;
    }
    return this;
  }

  insertListAfter(list: LinkedList<TData>, node: LinkedListNode<TData>) {
    if (!list.head || !list.tail) return this;
    if (!this.head || !this.tail) {
      this.head = list.head;
      this.tail = list.tail;
      this.length += list.length;
      return this;
    }
    if (node.next) {
      node.next.prev = list.tail;
      list.tail.next = node.next;
    }
    node.next = list.head;
    list.head.prev = node;
    this.length += list.length;
    if (node === this.tail) {
      this.tail = list.tail;
    }
    return this;
  }

  appendList(list: LinkedList<TData>) {
    if (!list.tail) return this;

    if (!this.head || !this.tail) {
      this.head = list.head;
      this.tail = list.tail;
      this.length += list.length;
      return this;
    }

    return this.insertListAfter(list, this.tail);
  }

  prependList(list: LinkedList<TData>) {
    if (!list.tail) return this;
    if (!this.head || !this.tail) {
      this.head = list.head;
      this.tail = list.tail;
      this.length += list.length;
      return this;
    }

    return this.insertListBefore(list, this.head);
  }

  toUint8Array(): Uint8Array {
    if (!this.head) return new Uint8Array(0);
    const buffer = new Uint8Array(this.length);
    let node = this.head;
    let i = 0;
    while (node) {
      if (!isNumber(node.data)) {
        console.error('node.data', node.data);
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

  // forEach(callback: (value: TData, index: number) => void) {
  //   let node = this.head;
  //   let i = 0;
  //   while (node) {
  //     callback(node.data, i++);
  //     if (!node.next) break;
  //     node = node.next;
  //   }
  // }

  static fromString(str: string) {
    const arr = str.split('').map((char) => char.charCodeAt(0));
    return new LinkedList(arr);
  }
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export default LinkedList;
