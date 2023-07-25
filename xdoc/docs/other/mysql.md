# Mysql基础
## 安装
- 1.官网安装mysql server服务端  
`Downloads`=> `MySQL Community (GPL) Downloads` => `MySQL Installer for Windows`。  
> 安装选项内勾选时，只勾选mysql server。  
> 安装时记住设置的用户名和密码。
- 2.安装mysql第三方客户端（SQLyog）
> 打开客户端即可使用。
## 增删改查语句
### 增Insert
(特殊的如果id自动递增的话，就不需要插入id)  
- 基本语法:  
```insert into 表名(列1，列2，列3，列4，...)  values(值，值，值)```  
例子：
```sql
insert into student(name,sex,age) values('张三'，18，'男')
```

- 插入的另外一种形式：  
```insert into 表名 set 列=值，列=值，列=值，....```  
例子:
```sql
insert into Set name = '张三',age=18
```

### 删delete
- 基本语法:   
```delete from 表名 where 列=值```  
例子：
```sql
delete from student where id=1
# DELETE from 表名 一行行删除整张表
# TRUNCATE table 表名 就是清空表
```

### 改update
- 基本语法:  
```update 表名 set 列=值，列=值，.... where...```  
例子：
```sql
update student set name = '张三' where id=1
```

### 查select
1. 基本查询语句:  
```sql
select * from student(查询student表中所有列)
```
*代表代表所有列，要查询哪一列就把*改成哪一列。  
可以查询一列，也可以查询多列，多列用逗号隔开，  
from后面跟的是表名。查询的结果包含列名和每一列的数据

2. 条件查询where  
```sql
select * from student where id =1(表示查询student表中id=1的学生的所有列)
```
where后跟查询条件,查询的如果是字符串，要带引号。  
多条件查询如果是并且条件，用and 或者用or。  
例子：
```sql  
# 查询出班级号为20201001班的学生并且要求是男生,年龄大于20
SELECT * from student where class_num = '20201001' and sex = '男' and age > 20
# 查询出班级号为20201001班的学生或者性别为女的学生
SELECT * from student WHERE class_num = '20201001' or sex = '女'
```

3. 去重查询 DISTINCT  
例子：  
```sql  
查询出表当中有哪些性别   
SELECT DISTINCT sex FROM student
```

4. 模糊查询(重点)  
模糊查询可以实现搜索功能,  
基本语法: like 通配符
例子：
```sql
select * from student where name like '%王' 
# 表示模糊查询name以王结束的
select * from student where name like '王%' 
# 表示模糊查询name以王开头的
select * from student where name like '%王%' 
# 表示模糊查询name中包含王字的
```

5. 排序查询 
ORDER BY 倒序关键字DESC  
默认排序规则是根据id进行排序，并且是id从小到大。  
例子：
```sql
# 按照年龄从低到高进行排序
SELECT * FROM student ORDER BY age

# 按照年龄从高到低进行排序
SELECT * FROM student ORDER BY age DESC
```

6. 分页查询
limit关键字：限定查询多少条数据。  
OFFSET关键字：从第几条数据开始查询 默认第一条数据是0  

例子：
```sql
# 查询出第二页的数据，这一页有3条数据
SELECT * FROM student LIMIT 3 OFFSET 3

# 知道页数和每页查询的数据（固定）
SELECT * FROM student LIMIT 数据量 OFFSET 数据量 * （页数-1）

SELECT * from student LIMIT 0,3
# LIMIT 0,3 limit后一个数据表示从第几条数据查起，后面数据是查询的条数
```

7. 聚合查询
count() :记录查询列有多少行  
SUM() :求数值序列的和  
AVG() :求平均数  
MAX() :求最大值  
MIN() :求最小值