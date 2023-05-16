import { isObject, isSymbol, echo } from "./util";

type EventHandler = echo<void>;

interface Mitt {
  on(type: string | symbol, handler: EventHandler): () => void;
  off(type: string | symbol, handler: EventHandler): void;
  emit(type: string | symbol, evt: any): boolean;
  clear(type: Array<string | symbol>): void;
  del(): void;
  all(): {
    storage: { [key: symbol]: EventHandler[] };
    keys: (string | undefined)[];
  };
}

const toSymbol: echo<symbol> = (value) =>
  isSymbol(value) ? value : Symbol.for(value);

/**
 * 监听发布
 */
function mittFunction(
  storage: { [key: string | symbol]: EventHandler[] } = {}
): Mitt {
  storage = isObject(storage) ? storage : Object.create(null);

  return {
    on: function on(type: string | symbol, handler: EventHandler): () => void {
      const sym = toSymbol(type);
      (storage[sym] || (storage[sym] = [])).push(handler);
      return () => {
        this.off(type, handler);
      };
    },

    off: function off(type: string | symbol, handler: EventHandler): void {
      const sym = toSymbol(type);
      if (storage[sym]) {
        storage[sym].splice(storage[sym].indexOf(handler) >>> 0, 1);
      }
    },

    emit: function emit(type: string | symbol, evt: any): boolean {
      let result = false;
      const sym = toSymbol(type);
      (storage[sym] || []).slice().map(function (handler) {
        handler(evt);
        result = true;
      });
      return result;
    },

    clear: function clear(type) {
      for (const iterator of type) {
        delete storage[toSymbol(iterator)];
      }
    },

    del: function del() {
      // @ts-ignore
      storage = null
    },

    all: function all(): {
      storage: { [key: string]: EventHandler[] };
      keys: (string | undefined)[];
    } {
      return {
        storage,
        keys: Object.getOwnPropertySymbols(storage).map(
          (sym) => sym.description
        ),
      };
    },
  };
}

export { mittFunction, Mitt };
