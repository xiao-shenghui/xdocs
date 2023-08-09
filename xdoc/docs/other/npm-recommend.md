# npm包推荐
> 主要用于**收集**+**介绍**一些有用的npm包。
## mddir
> 可以快速的生成本目录下的目录结构(目录树)
### 全局安装
```sh
npm install mddir -g
```
### 打印结构
> 会生成`directoryList.md`的文件, 并且在控制台打印`目录树`
```sh
mddir
```

## nvm
> 可以`免卸载`，快速的切换/管理/安装`node版本`
### 全局安装
```sh
npm install nvm -g
```
### 使用
```sh
nvm help # 查看使用命令大全
nvm list # 查看已经安装的node版本
nvm use 18.17.1 #使用该版本
nvm list available # 查看可安装的node版本大全
```
### 注意事项
> 每个`node版本`对应一个`npm版本`, 因此每个`node版本`安装的包，都仅限于该版本使用。  
> 如果切换了版本, 需要重新安装。

## Nodemon
> 代替node启动js文件(node服务器)，在js文件每次修改时，自动重启。
### 全局安装
```sh
npm install nodemon -g
```

### 使用
```sh
nodemon ./server.js # 启动js文件
```

## 框架的脚手架
> vue: vue-cli(旧), 新版推荐使用`npm init vue@latest`,这个指令会自动执行`create-vue`  
> react: create-react-app 
### 全局安装
```sh
npm install vue-cli -g
npm install create-react-app -g
```
### 使用
```sh
vue -V #检测vue-cli版本
vue create my-project #创建vue项目

# 如果已经安装脚手架
create-react-app --version #查看版本
create-react-app my-app #创建react项目

# 如果没有安装react脚手架，
# 也可以用npx创建react项目
npx create-react-app my-app #创建react项目, 
# npx是从npm5.2+版本就自带的，不需要另外安装。
```