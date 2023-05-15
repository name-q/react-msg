// 类型判断
type echo<T, V = any> = (value: V) => T;

const _toString = Object.prototype.toString;
const toRawType: echo<string> = (value) => _toString.call(value).slice(8, -1);

const isObject: echo<boolean> = (value) => toRawType(value) === "Object";
const isSymbol: echo<boolean> = (value) => toRawType(value) === "Symbol";



export {
  echo,
  isObject,
  isSymbol,
};
