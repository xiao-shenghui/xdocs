# create-react-app 创建项目初体验
## 检测安装
```sh
create-react-app -V #检测安装版本
```
## 创建项目，目录my-app
```sh
create-react-app my-app # 创建项目
# 会自动安装react，react-dom, react-scripts 等插件
```
## 进入项目，打开项目看目录结构
```sh
cd my-app #进项目里面
npm start #运行项目
```
- 用VSCode打开项目
```html
<!-- 目录结构 -->
- node_modules/
- public/
- scr/
- .gitignore
- package-lock.json
- package.json
- README.md
```
- 查看App.js (React里面，js文件就是页面或者组件)
```js
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

- 修改文本内容
```js
<p>
  编辑 <code>src文件下/App.js</code> 并且保存即可重载
</p>
<a
  className="App-link"
  href="https://react.docschina.org/"
  target="_blank"
  rel="noopener noreferrer"
>
  学习React-中文文档
</a>
```
<img src="./mdImg/creat-react-app-first.png">
