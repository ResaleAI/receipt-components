import { ILinkedList, LinkedListNode } from '@/types';

export class LinkedList<T> implements ILinkedList<T> {
  head: LinkedListNode<T> | null = null;
  tail: LinkedListNode<T> | null = null;
  length = 0;

  constructor(values?: T[]) {
    if (values) {
      for (const value of values) {
        this.append(value);
      }
    }
  }

  append(value: T) {
    const node: LinkedListNode<T> = {
      value,
      next: null,
      prev: null,
    };

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else if (this.tail) {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  prepend(value: T) {
    const node: LinkedListNode<T> = {
      value,
      next: null,
      prev: null,
    };

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else if (this.head) {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
  }

  appendList(list: LinkedList<T>) {
    if (list.length === 0 || list.head === null) {
      return this;
    }

    if (this.length === 0) {
      // set to new list
      this.head = list.head;
      this.tail = list.tail;
    } else if (this.tail) {
      this.tail.next = list.head;
      list.head.prev = this.tail;
      this.tail = list.tail;
    }
    this.length += list.length;
    return this;
  }

  prependList(list: LinkedList<T>) {
    if (list.length === 0 || list.tail === null) {
      return this;
    }

    if (this.length === 0) {
      // set to new list
      this.head = list.head;
      this.tail = list.tail;
    } else if (this.head) {
      list.tail.next = this.head;
      this.head.prev = list.tail;
      this.head = list.head;
    }
    this.length += list.length;
    return this;
  }
}
