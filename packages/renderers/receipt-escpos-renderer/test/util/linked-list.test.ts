import { describe, it, assert, expect } from 'vitest';
import LinkedList from '../../src/util/linked-list';

describe('linked-list', () => {
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
});
