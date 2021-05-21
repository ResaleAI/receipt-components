import BaseNode from './base.js';

// extend base node so that when children are set,
// the super func can be run
class SlotNode extends BaseNode {
  constructor(mods, attrs) {
    super(mods, attrs);

    const slotName = attrs?.name ?? 'default';
    this.name = slotName;
  }

  overrideSlotContent(newChildren) {
    this.children = newChildren;
  }
}

export default SlotNode;
