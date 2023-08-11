import LinkedList from '@/linked-list';
import { describe, it, assert, expect } from 'vitest';

describe('linked-list', () => {
  describe('LinkedList', () => {
    describe('constructor', () => {
      it('should create an empty list by default', () => {
        const list = new LinkedList();

        assert(list.head === null);
        assert(list.tail === null);
        assert(list.length === 0);
      });

      it('should create a list from a given array', () => {
        const list = new LinkedList([1, 2, 3]);

        assert(list.head!.data === 1);
        assert(list.head!.next!.data === 2);
        assert(list.tail!.data === 3);
        assert(list.length === 3);
      });
    });
    describe('append', () => {
      it('should append a node to an empty list', () => {
        const list = new LinkedList();
        list.append(1);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 1);
        assert(list.length === 1);
      });

      it('should append a node to a list with one node', () => {
        const list = new LinkedList();
        list.append(1);
        list.append(2);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 2);
        assert(list.length === 2);
      });

      it('should append a node to a list with multiple nodes', () => {
        const list = new LinkedList();
        list.append(1);
        list.append(2);
        list.append(3);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 3);
        assert(list.length === 3);
      });
    });

    describe('prepend', () => {
      it('should prepend a node to an empty list', () => {
        const list = new LinkedList();
        list.prepend(1);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 1);
        assert(list.length === 1);
      });

      it('should prepend a node to a list with one node', () => {
        const list = new LinkedList();
        list.prepend(1);
        list.prepend(2);
        assert(list.head!.data === 2);
        assert(list.tail!.data === 1);
        assert(list.length === 2);
      });

      it('should prepend a node to a list with multiple nodes', () => {
        const list = new LinkedList();
        list.prepend(1);
        list.prepend(2);
        list.prepend(3);
        assert(list.head!.data === 3);
        assert(list.tail!.data === 1);
        assert(list.length === 3);
      });
    });

    describe('appendList', () => {
      it('should append a list to an empty list', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list2.append(1);
        list.appendList(list2);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 1);
        assert(list.length === 1);
      });

      it('should append a list to a list with one node', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list.append(1);
        list2.append(2);
        list.appendList(list2);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 2);
        assert(list.length === 2);
      });

      it('should append a list to a list with multiple nodes', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list.append(1);
        list.append(2);
        list2.append(3);
        list.appendList(list2);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 3);
        assert(list.length === 3);
      });
    });

    describe('prependList', () => {
      it('should prepend a list to an empty list', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list2.append(1);
        list.prependList(list2);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 1);
        assert(list.length === 1);
      });

      it('should prepend a list to a list with one node', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list.append(1);
        list2.append(2);
        list.prependList(list2);
        assert(list.head!.data === 2);
        assert(list.tail!.data === 1);
        assert(list.length === 2);
      });

      it('should prepend a list to a list with multiple nodes', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list.append(1);
        list.append(2);
        list2.append(3);
        list.prependList(list2);
        assert(list.head!.data === 3);
        assert(list.tail!.data === 2);
        assert(list.length === 3);
      });
    });

    describe('insertListBefore', () => {
      it('should insert a list before the head of an empty list', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list2.append(1);
        list.insertListBefore(list2, list.head!);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 1);
        assert(list.length === 1);
      });

      it('should insert a list before the head of a list with one node', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list.append(1);
        list2.append(2);
        list.insertListBefore(list2, list.head!);
        assert(list.head!.data === 2);
        assert(list.tail!.data === 1);
        assert(list.length === 2);
      });

      it('should insert a list before a node in a list with multiple nodes', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list.append(1);
        list.append(2);
        list2.append(3);
        list.insertListBefore(list2, list.tail!);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 2);
        assert(list.head!.next!.data === 3);
        assert(list.length === 3);
      });

      it('should do nothing if empty list is passed in', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list.append(1);
        list.append(2);
        list.insertListBefore(list2, list.tail!);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 2);
        assert(list.length === 2);
      });

      it('should replace the head if the head is passed in', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list.append(1);
        list.append(2);
        list2.append(3);
        list.insertListBefore(list2, list.head!);
        assert(list.head!.data === 3);
        assert(list.tail!.data === 2);
        assert(list.length === 3);
      });
    });

    describe('insertListAfter', () => {
      it('should insert a list after the tail of an empty list', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list2.append(1);
        list.insertListAfter(list2, list.tail!);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 1);
        assert(list.length === 1);
      });

      it('should insert a list after the tail of a list with one node', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list.append(1);
        list2.append(2);
        list.insertListAfter(list2, list.tail!);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 2);
        assert(list.length === 2);
      });

      it('should insert a list after a node in a list with multiple nodes', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list.append(1);
        list.append(2);
        list2.append(3);
        list.insertListAfter(list2, list.head!);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 2);
        assert(list.head!.next!.data === 3);
        assert(list.length === 3);
      });

      it('should do nothing if empty list is passed in', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list.append(1);
        list.append(2);
        list.insertListAfter(list2, list.head!);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 2);
        assert(list.length === 2);
      });

      it('should replace the tail if the tail is passed in', () => {
        const list = new LinkedList();
        const list2 = new LinkedList();
        list.append(1);
        list.append(2);
        list2.append(3);
        list.insertListAfter(list2, list.tail!);
        assert(list.head!.data === 1);
        assert(list.tail!.data === 3);
        assert(list.length === 3);
      });
    });

    describe('subList', () => {
      it('should return a sub list that doesnt include the given end node', () => {
        const list = new LinkedList([1, 2, 3, 4]);
        const subList = list.subList(list.head!, list.tail!.prev!);
        assert(subList.head!.data === list.head!.data);
        assert(subList.tail!.data === list.head!.next!.data);
        assert(subList.length === 2);
      });

      it('should return a sub list without any references to original list', () => {
        const list = new LinkedList([1, 2, 3, 4]);
        const subList = list.subList(list.head!, list.tail!.prev!);
        assert(subList.head !== list.head);
        assert(subList.tail !== list.head!.next);
      });

      it('should throw and error if endNode is not in the list', () => {
        const list = new LinkedList([1, 2, 3, 4]);
        expect(() =>
          list.subList(list.head!, { data: 2, next: null, prev: null })
        ).to.throw();
      });
    });

    describe('toUint8Array', () => {
      it('should throw an error if the list contains non-numbers values', () => {
        const list = new LinkedList([1, 2, 3, '4']);
        expect(() => list.toUint8Array()).to.throw();
      });

      it('should return a Uint8Array with the same data as the linked list', () => {
        const list = new LinkedList([1, 2, 3, 4]);
        const uint8Array = list.toUint8Array();
        assert(uint8Array.length === list.length);
        let node = list.head;
        let i = 0;

        while (node) {
          assert(uint8Array[i++] === node.data);
          node = node.next;
        }
      });
    });

    describe('LinkedList.fromString', () => {
      it('should return a linked list with the same data as the string', () => {
        const list = LinkedList.fromString('hello');
        assert(list.length === 5);
        assert(list.head!.data === 'h'.charCodeAt(0));
        assert(list.tail!.data === 'o'.charCodeAt(0));
      });
    });
  });
});
