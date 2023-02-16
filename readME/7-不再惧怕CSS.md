# 6-2 不再惧怕 CSS - CSS-in-JS

CSS-in-JS 不是指某一个具体的库，是指组织 CSS 代码的一种方式，代表库有 styled-component 和 emotion

## 传统 CSS 的缺陷

### 1. 缺乏模块组织

传统的 JS 和 CSS 都没有模块的概念，后来在 JS 界陆续有了 CommonJS 和 ECMAScript Module，CSS-in-JS 可以用模块化的方式组织 CSS，依托于 JS 的模块化方案，比如：

```jsx
// button1.ts
import styled from "@emotion/styled";

export const Button = styled.button`
  color: turquoise;
`;
// button2.ts
import styled from "@emotion/styled";

export const Button = styled.button`
  font-size: 16px;
`;
```

### 2. 缺乏作用域

传统的 CSS 只有一个全局作用域，比如说一个 class 可以匹配全局的任意元素。随着项目成长，CSS 会变得越来越难以组织，最终导致失控。CSS-in-JS 可以通过生成独特的选择符，来实现作用域的效果

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0f62fac7-c078-439a-964f-17bbfa478c0d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0f62fac7-c078-439a-964f-17bbfa478c0d/Untitled.png)

```jsx
const css = (styleBlock) => {
  const className = someHash(styleBlock);
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    .${className} {
      ${styleBlock}
    }
  `;
  document.head.appendChild(styleEl);
  return className;
};
const className = css(`
  color: red;
  padding: 20px;
`); // 'c23j4'
```

### 3. 隐式依赖，让样式难以追踪

比如这个 CSS 样式：

```css
.target .name h1 {
  color: red
}

body #container h1 {
  color: green
}
<!doctype html>
<html lang="en">
<body>
  <div id='container'>
   <div class='target'>
     <div class='name'>
       <h1>我是啥颜色？</h1>
     </div>
   </div>
  </div>
</body>
</html>
```

那么这个 h1 元素最终显式为什么颜色？加入你想要追踪这个影响这个 h1 的样式，怎么追踪？

而 CSS-in-JS 的方案就简单直接、易于追踪

```html
export const Title = styled.h1` color: green; ` <title>我是啥颜色？</title>
```

### 4. 没有变量

传统的 CSS 规则里没有变量，但是在 CSS-in-JS 中可以方便地控制变量

```css
const Container = styled.div(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}))
```

### 5. CSS 选择器与 HTML 元素耦合

```css
.target .name h1 {
  color: red
}

body #container h1 {
  color: green
}
<!doctype html>
<html lang="en">
<body>
  <div id='container'>
   <div class='target'>
     <div class='name'>
       <h1>我是啥颜色？</h1>
     </div>
   </div>
  </div>
</body>
</html>
```

如果你想把 `h1` 改成`h2`，必须要同时改动 CSS 和 HTML。而在 CSS-in-JS 中，HTML 和 CSS 是结合在一起的，易于修改

## Emotion 介绍

Emotion 是目前最受欢迎的 CSS-in-JS 库之一，它还对 React 作了很好的适应，可以方便地创建 styled component，也支持写行内样式：

```css
/** @jsx jsx */
import { jsx } from '@emotion/react'

render(
  <div
    css={{
      backgroundColor: 'hotpink',
      '&:hover': {
        color: 'lightgreen'
      }
    }}
  >
    This has a hotpink background.
  </div>
)
```

这种写法比起 React 自带的 style 的写法功能更强大，比如可以处理级联、伪类等 style 处理的不了的情况
