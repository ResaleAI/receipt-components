// base class for any node which can be defined as:
// - having or not having children

// - having or not having attrs
class BaseNode {
  constructor(mods, attrs = null) {
    this.attrs = attrs;
    this.children = [];
    this.mods = mods;

    // relative info
    this.firstChild = null;
    this.lastChild = null;
    this.nextSibling = null;
    this.prevSibling = null;
  }

  // static helper to make it a lil more
  // clear whats going on in each node
  static bytes = {
    ESC: 0x1b,
    LF: 0x0a,
    NUL: 0,
    GS: 0x1d,
  };

  // the main method for adding children to nodes
  appendChild(child) {
    child.parent = this;
    if (this.firstChild === null) {
      this.firstChild = child;
    }

    child.prevSibling = this.lastChild;
    if (this.lastChild) this.lastChild.nextSibling = child;
    this.lastChild = child;
  }

  requireAttributes(...attrKeys) {
    attrKeys.forEach((key, i) => {
      if (key in this.attrs) {
        return;
      }
      throw new Error(`Missing required attribute: ${key}`);
    });
  }

  render(data, preview = false) {
    if (preview) {
      return this.renderHTML(data);
    }
    return this.renderPrinterBytes(data);
  }

  renderHTML(data) {
    if (this.children.length > 0) {
      let childHTML = '';
      this.children.forEach(child => {
        childHTML += child.renderHTML(data);
      });
      return childHTML;
    }
    return [];
  }

  renderPrinterBytes(data) {
    let child = this.firstChild ?? null;
    let childBytes = [];
    while (child !== null) {
      try {
        childBytes.push(...child.renderPrinterBytes(data));
      } catch (e) {
        console.log(child);
      }

      child = child.nextSibling ?? null;
    }
    return childBytes;
  }
}

export default BaseNode;
