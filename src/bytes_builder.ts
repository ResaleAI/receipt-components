import globals from './components';
import { ReceiptComponent } from './types';

export class CascadingBytesBuilder {
  modificationStack: {
    [mod: string]: number[];
  };

  globalComponents: {
    [name: string]: ReceiptComponent;
  };

  static bytes = {
    ESC: 0x1b,
    LF: 0x0a,
    NUL: 0,
    GS: 0x1d,
  };

  constructor(defaultMods: { [mod: string]: number[] }) {
    this.modificationStack = defaultMods;

    this.globalComponents = globals;
  }

  RawBytes(...args: any[]): number[] {
    let retVal: number[] = [];
    for (let data of args) {
      switch (typeof data) {
        case 'string':
          for (let i = 0; i < data.length; i++) {
            if (data.charCodeAt(i) !== 0) {
              retVal.push(data.charCodeAt(i));
            }
          }
          break;
        case 'number':
          retVal.push(<number>data);
          break;
      }
    }

    return retVal;
  }

  GlobalMod(code: number, key: string, val: number): number[] {
    this.modificationStack[key] = [val];

    return this.RawBytes(code, key, val);
  }

  ScopedMod(
    code: number,
    key: string,
    val: number,
    children: (builder: CascadingBytesBuilder) => number[]
  ): number[] {
    if (!this.modificationStack[key]) {
      // assuming default for everything is 0, may be wrong...
      this.modificationStack[key] = [val];
    } else if (
      this.modificationStack[key][this.modificationStack[key].length - 1] == val
    ) {
      return children(this);
    } else {
      this.modificationStack[key].push(val);
    }

    const top =
      this.modificationStack[key][this.modificationStack[key].length - 1];

    let retVal = [code, key.charCodeAt(0), top];
    retVal.push(...children(this));
    this.modificationStack[key].pop();

    // return and set value back to prev state;
    return [
      ...retVal,
      code,
      key.charCodeAt(0),
      this.modificationStack[key][this.modificationStack[key].length - 1] ?? 0,
    ];
  }

  RenderComponent(
    component: ReceiptComponent | string,
    props: { [name: string]: any },
    children?: (builder: CascadingBytesBuilder) => number[]
  ): number[] {
    if (typeof component == 'string') {
      if (!globals[component]) throw 'Undefined component';
      return globals[component].Render(this, props, children);
    }
    return (<ReceiptComponent>component).Render(this, props, children);
  }
}
