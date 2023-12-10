# git 使用体验。
> 需求：1.提交一个html文件到gitee的仓库（"测试库-xiao"）里面。
## git常用命令大全
- git config 
	- git config --global user.name "xxx" 设置本地仓库用户名
	- git config --global user.email "xxx" 设置本地仓库邮箱
	- git config --list # 查看邮箱和用户名
- git remote 
	- 链接远程仓库 
	- git remote add 仓库别名 仓库URL
	- git remote remove 仓库别名 仓库URL
- git add xx 
	- 添加文件到暂存区
- git commit -m "xxx" 
	- 将暂存区文件提交到本地
- git push 远程仓库别名 分支名, 推送到远程。 例如git push origin master
- git pull 远程仓库别名 分支名, 
	- 拉取最新代码到本地目录进行自动合并。 
	- 实际上是git fetch 和 git merge的综合操作。
- git fetch 远程仓库别名 分支名,
	- 获取远程仓库数据到本地分支，包括最新分支，提交记录，代码更新等等。
- git merge 
	- git merge 别的分支名。
	- 合并当前分支和别的分支，可选 --abort，--ff，
	- 会产生一次新的提交记录。
	- 解决合并冲突： git add 
- git log 
	- 查看提交记录，按Q退出
- git checkout -b 分支名
	- 切换分支，用于开发	
- git reset --hard 提交记录的id
	- 有多个可选，--hard, --mixed, --soft 
	- 代码回滚到指定的commit
	- reset之后，要git push -f才会生效。
- git revert 提交记录的id
	- 撤销指定commit的修改，并且不影响后续的commit，
	- 保留完整的 git 历史,对多人合作的分支来说比较友好。
	- revert执行后不会清除记录，并且会产生新纪录，所以文件不会丢失
	- 可以多次执行revert恢复到某次改变之前的状态；
- git rebase 分支名
	- 变基操作，会把你当前分支的 commit 放到变基分支的最后面，并且合并。
	- 例如你从master分支拉的A分支进行开发，别人在master分支合并了代码，此时就有用了。
- git branch 新的分支
	- 本地创建新的分支
	- git branch -d 分支名，删除分支

## 1.首次提交：
首次提交，先输入github/gitlab等的用户名和邮箱
```sh
git config --global user.name "用户名" # 例如我的：xiao-shenghui
git config --global user.email "邮箱" # 例如我的：1653618993@qq.com
git config --list # 查看邮箱和用户名
```
## 2.进入项目路径,初始化仓库。
鼠标右键，git-bush-here.
```
git init
```
会新建一个.git 文件。
## 3.查看状态
> 查看与上次提交相比，目前是否有修改文件
```sh
git status
```
<img src="https://img-blog.csdnimg.cn/img_convert/e57b26e0495a11945e597c3850b6b000.png">  
绿色的是已经在暂存区的修改文件，红色的是没有存入暂存区的修改文件。  
**提示**：如果查看到红色的，需要先暂存才能提交。  

## 4.将修改后的文件存入暂存区
> 对于出行红色的文件，需要全部加入到暂存区域
```sh
git add . # (注意空格后面有一个点)
```
此时可以再次用 git status 查看有没有红色的。

## 5.提交修改代码
```sh
git commit -m "注释内容"
```

### git 如何修改最近一次的commit信息
1. git commit --amend
2. 进入vim操作界面之后, 点击字母键 i 然后进入INSERT模式，然后对commit信息进行修改，然后ESC 然后 :wq 保存退出
3. 然后执行 git log 会发现最近的一次commit信息被修改成功了
4. 最后按Q可以退出浏览模式。

## 6.链接已有仓库
```sh
git remote add origin 仓库链接.git  
# 注意 origin 是变量名，自定义的，默认的远程仓库名
# 例如我的测试库：https://gitee.com/xiaoshenghui/test-library-xiao.git 
git remote add origin https://gitee.com/xiaoshenghui/test-library-xiao.git
```

## 6.拉取远程与本地合并
> 提交之后，需要先把远程代码拉取过来与本地合并，这样本地文件就是最新的了。
```sh
git pull origin master # 分支名一般为master，也可以手动创建分支名，git checkout -b "分支名"（"#master_name"或者"master_name", 带引号）
```

## 7.推送本地到远程合并
> 将本地的分支版本,上传到远程并合并
```sh
git push origin master # 分支名一般为master，也可以手动创建分支名 git checkout -b $master_name
```
## 8. 链接仓库报错？
> 当已经链接了仓库，如何更换仓库？
```sh
git remote rm origin # 删除已经链接的仓库
git remote add origin https://gitee.com/xiaoshenghui/xxx.git # 链接新的仓库
```
> 如何同时连接多个仓库？
```sh
git remote add origin https://gitee.com/xxx  # 链接gitee仓库
# 换一个仓库变量名即可
git remote add github https://github.com/xxx # 同时链接github仓库
# 同理，push或者pull的时候，也要更换仓库名
git push github master # 推送到github
git push origin master # 推送到gitee
```
> 如何查看当前链接的远程仓库？
```sh
git remote -v # 查看当前链接的仓库
# 打印如下结果
origin  https://gitee.com/xiao-shenghui/code-road-blog-xiao.git (fetch)
origin  https://gitee.com/xiao-shenghui/code-road-blog-xiao.git (push)
```

## 分支操作(不常用)
- git branch => 查看分支
- git branch 分支 => 创建分支
- git checkout 分支 => 切换分支
- git merge 分支 => 合并分支，需要切换到主分支上才能合并其它的分支
- git switch -c 分支名 创建并切换分支
- git branch -D 分支名 删除分支
