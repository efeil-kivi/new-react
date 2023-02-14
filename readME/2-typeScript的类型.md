## typeScript 的类型

### 1.number\string\bolean\object

### 2.array

​ 同类型的数组和区分

### 3.函数

1．在我们熟悉的"JS 函数”上直接声明参数和返回值:

```typescript
/*
*我在这里做了一些修改,在箭头前边加上了: boolean
*但是在我们上节课的代码中是没有这个: boolean的，
*之所以不需要加是因为类型推断，这个我们在下面会讲
*@param value
*/
const isFalsy = (value: any) : boolean => {
	return value === 。 ? true : !!value;
};
```

2.直接声明你想要的函数类型:JavaScript

```typescript
/*
 *上节课写的useMount和isFalsy
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};

const isFalsy: (value: any) => boolean = (value) => {
  return value === 0 ? true : !!value;
};
```

### 4.any

```typescript
let looselyTyped: any = 4;
// looselyTyped的值明明是个4，哪里来的ifItExists方法呢?
//由于声明为any，我们没法在静态检查阶段发现这个错误
looselyTyped.ifItExists();
```

初学 TS 的同学经常会为了让 TS 不再报错就用了很多 any，这样做会失去 TS 的保护。同学们应该尽量避免使用 any

### 5.void

绝大部分情况下，只会用在这一个地方︰表示函数不返回任何值或者返回 undefined(因为函数不返回任何值的时候===返回 undefined)

```typescript
/**
 *上节课写的useMount
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};
```

### 6.tuple

其实这个大家已经见过了，这是没有给大家指出来这就是一个典型的 tuple

```typescript
const [users, setUsers] = useState([]);
```

tuple 是"数量固定，类型可以各异”版的数组

在 React 中有可能使用 tuple 的地方就是 custom hook 的返回值，注意 isHappy -→ tomIsHappy 以及其他名字的变化，这里使用 tuple 的好处就显现出来了:便于使用者重命名

```typescript
const useHappy = ()=>{
    //...
    return [isHappy ,makeHappy ,makeUnHappy]
}
const SomeComponent =()=>{
    const [tomIsHappy，makeTomHappy，makeTomUnHappy] = useHappy( false)
    // ...
}
```

如果是对象的话

```typescript
const useHappy = () => {
  //...
  return { ishappy };
};
const SomeComponent = () => {
  const { ishappy: tomIsHappy } = useHappy();
  // ...
};
```

### 7.enum

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

### 8.null&undefiend

既是一个值也是一个类型

```typescript
let n: unll = null;
let u: undefiend = undefiend;
```

### 9.unknown

unknown 表示这个值可以是任何值

unknown 的用法:在你想用 any 的时候，用 unknown 来代替，简单来说，unknown 是一个"严格"版的 any

```typescript
const isFalsy = (value: any) => {
  //大家不用考虑这段console有啥意义，把它打在你的代码里对应的位置，观察编辑器会不会报错;
  //再思考它应不应该报错
  console.log(value.mayNotExist);
  return value === 0 ? true : !!value;
};
```

替换成：

```typescript
const isFalsy = (value: unknown) => {
  console.lgg(value.mayNotExist);
  return value === 0 ? true : !!value;
};
```

### 10，nerver

```typescript
//这个func返回的就是never类型，用到比较少，在类型操作等场景会用到
const func = () => {
  throw new Error();
};
```

### interface

接口

### 啥时候需要声明类型

理论上来说在我们声明任何变量的时候都需要声明类型(包括普通变量、函数、组件、hook 等等)，声明函数、组件、hook 等需要声明参数和返回值的类型。

但是在很多情况下，TS 可以帮我们自动推断，我们就不用声明了，比如:

```typescript
//这里虽然没有显式声明，但是ts自动推断这是个number
let a = 1;
//自动推断返回值为number
function add(a: number, b: number) {
  return a + b;
}
//自动推断返回值为boolean
const isFalsy = (value: unknown) => {
  return value === 0 ? true : !!value;
};
```

### .d.ts

JS 文件+.d.ts 文件=== ts 文件

.d.ts 文件可以让 JS 文件继续维持自己 JS 文件的身份，而拥有 TS 的类型保护
