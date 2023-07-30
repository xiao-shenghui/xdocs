## nvm 使用
### 1.下载安装包：
- GitHub安装包
- 找到 Assets列表里的**nvm-setup.exe**,双击下载
### 2.安装exe文件
- 一路点击**下一步**
### 3.cmd控制台操作
```cmd
nvm -v        ## 查看 nvm 版本
nvm list available        ## 查看可安装的node版本
nvm install 版本号        ## 安装自选版本
nvm list        ## 查看已经安装的node版本
nvm use 版本号  ## 启用对应的版本
nvm uninstall 版本号 卸载删除对应的版本
```
### 4.npm配置镜像源（淘宝镜像）
```sh
npm config set registry https://registry.npm.taobao.org
```

### 5.vuecli 安装
```sh
npm install -g @vue/cli
vue -V
@vue/cli 5.0.8
```