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

## nrm
> 可以`免重置镜像`，内置`npm`,`yarn`,`cnpm`和`taoboa`等多个镜像。  
### 全局安装
```sh
npm i nrm -g
```

### 使用
```sh
nrm use npm # 切换到npm
nrm ls #显示所有镜像
```

## pnpm
> 比npm更快，将已经下载过的依赖，保存到硬盘缓存，别的项目从缓存读取。
### 全局安装
```sh
npm i pnpm -g
```
### 使用
```sh
# 和npm一样使用
pnpm i element-ui --save
```

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
> vue2: vue-cli(旧), 新版推荐使用`npm init vue@latest`,这个指令会自动执行`create-vue`  
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
### vue3使用vite
```sh
npm init vite@latest 
# 使用vite选择对应的模板，可选大部分框架的模板
```
## TSC
> 一个官方推荐和开发的，自动运行+编译ts文件的typescript包
### 安装
```sh
cnpm install typescript -g #安装
tsc -v #检测是否安装成功
```

### 使用
```sh
tsc -help #帮助
tsc -w xx.ts #监测ts文件变化，并且自动编译
```

## serve
> 项目`build`后，都要先在本地测试一遍服务器，是否有bug。  
> 常规是使用`five server`, `live server`,   
> 但是会加重`vscode`的卡顿负担。  
> 推荐一个全局工具包`serve`
### 安装
```sh
npm i serve -g #安装依赖包，用于启动本地服务器
```
### 使用
```sh
serve -s dist 
#一般打包以后, 打包后的项目，都与src同级别，一般是dist目录 
# 也可以 serve -s ./dist
# 并且自带监听端口，类似于nodemon
```

## rimraf
> 一个用命令行快速删除大型文件的工具  
> 前端`node_modules`文件夹经常因为下载依赖包出错而要删除，  
> 使用系统自带的删除非常慢, 且有时候系统会卡死, 因为系统要检索文件。  
> 使用`rimraf`工具，可以快速删除选定的文件夹及内容。  

### 安装
```sh
cnpm i rimraf -g #安装依赖包，用于删除文件夹
``` 

### 使用
```sh
rimraf node_modules #删除node_modules文件夹
```