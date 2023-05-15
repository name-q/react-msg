# react-msg

[![NPM version](https://img.shields.io/npm/v/react-msg.svg?style=flat)](https://npmjs.org/package/react-msg)
[![NPM downloads](http://img.shields.io/npm/dm/react-msg.svg?style=flat)](https://npmjs.org/package/react-msg)

## Install

```bash
$ yarn react-msg
```

## Use

```jsx
import msg from 'react-msg'
// msg:Mitt
interface Mitt {
  on(type: string | symbol, handler: EventHandler): () => void;
  off(type: string | symbol, handler: EventHandler): void;
  emit(type: string | symbol, evt: any): boolean;
  clear(type: Array<string | symbol>): void;
  del(): void;
  all(): {
    storage: { [key: string]: EventHandler[] };
    keys: (string | undefined)[];
  };
}

```



## LICENSE

MIT
