# 鸭子类型:面向接口编程而不是面向对象编程

```tsx
interface Base {
    id：number
}
interface advance extends Base{
    name: string
}
const test = (p: Base) =>{}
//鸭子类型:面向接口编程而不是面向对象编程 const a:advance = {id: 1,name: 'jack '} 可以，下面一句也可以
const a = {id: 1,name: 'jack '}
test(a)
```
