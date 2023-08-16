# 上传文件之后端
> 在后端使用 Node.js 和 Express 处理不同类型的文件上传时，  
> 可以通过不同的`中间件`或`处理函数`来处理不同类型的请求。

以下是针对不同文件上传类型的处理示例：

### 处理 FormData
> 可以使用 `multer` 中间件来处理。    
> `multer` 是一个流行的 Express 中间件，用于处理文件上传。
1. 首先，安装 `multer` 模块：
```bash
npm install multer
```
2. 然后，在 Express 应用程序中使用 `multer` 中间件来处理 FormData 请求：
```javascript
const express = require('express');
const multer = require('multer');

const app = express();

const upload = multer();

app.post('/upload', upload.array('file'), (req, res) => {
  // 处理上传的文件
  console.log(req.files);
  res.send('文件已上传');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
在上述示例中，我们创建了一个 Express 应用，使用 `multer()` 创建一个 `upload` 中间件实例。然后，使用 `upload.array('file')` 指定上传的字段名为 `'file'`。  
当应用收到 `/upload` 路径的 POST 请求时，中间件将会处理请求，将上传的文件存储在 `req.files` 中，可在处理函数中进行进一步处理。

### 处理 Base64
> 可以通过`解码 Base64 字符串`并将其`写入文件`来处理。
```javascript
const express = require('express');
const fs = require('fs');

const app = express();

app.post('/upload', (req, res) => {
  const base64Data = req.body.base64Data;
  const buffer = Buffer.from(base64Data, 'base64');

  fs.writeFile('uploadedFile.jpg', buffer, (error) => {
    if (error) {
      console.error(error);
      res.status(500).send('文件上传失败');
    } else {
      res.send('文件已上传');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
在上述示例中，我们将 POST 请求体中的 `base64Data` 字段作为 Base64 编码的文件内容进行处理。  
我们使用 `Buffer.from()` 方法将其解码为 `buffer`，然后使用 `fs.writeFile()` 将 `buffer` 写入文件进行保存。

### 处理多文件上传
> 可以使用 `multer` 中间件的 `array` 或 `fields` 方法处理，与 FormData 的处理方式相同。

```javascript
const express = require('express');
const multer = require('multer');

const app = express();

const upload = multer();

app.post('/upload', upload.array('file'), (req, res) => {
  console.log(req.files);
  res.send('文件已上传');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

在上述例子中，我们可以传递一个包含多个文件的 `file` 字段给 `array` 方法。

### 处理大文件上传和断点续传
> 需要使用特殊的库或工具来处理，因为传统的文件上传方式可能会导致性能问题。
> 一种常见的解决方案是使用`流式上传`，将大文件拆分为小块进行上传，并在上传过程中保存上传的进度和断点信息。
```javascript
const express = require('express');
const fs = require('fs');
const app = express();

// 保存已上传的文件块的路径
const writeDir = './uploads';

// 创建存储路径（如果不存在）
if (!fs.existsSync(writeDir)) {
  fs.mkdirSync(writeDir);
}

// 处理大文件上传
app.post('/upload', (req, res) => {
  const fileName = req.headers['file-name'];
  const fileSize = parseInt(req.headers['file-size']);
  const chunkIndex = parseInt(req.headers['chunk-index']);
  const totalChunks = parseInt(req.headers['total-chunks']);
  const filePath = writeDir + '/' + fileName;

  const fileStream = fs.createWriteStream(filePath, {
    flags: 'a' // 追加写入
  });

  req.pipe(fileStream);

  req.on('end', () => {
    console.log(`文件块 ${chunkIndex} / ${totalChunks} 已上传`);

    if (chunkIndex === totalChunks - 1) {
      console.log('文件上传完成');
      res.send('文件上传完成');
    } else {
      res.send('文件块上传成功');
    }
  });

  req.on('error', () => {
    console.error(`文件块 ${chunkIndex} / ${totalChunks} 上传失败`);
    res.status(500).send('文件块上传失败');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
在上述示例中，我们首先创建了一个存储已上传文件块的目录 `writeDir`。然后，我们定义了 `/upload` 路径的 POST 请求处理程序。  
从请求的 headers 中获取文件的名称、大小、块索引和总块数等信息。
然后，我们使用文件名称构建文件的完整路径。  
接下来，我们创建一个可写的文件流，并通过 `pipe` 方法将请求流写入文件流进行持久化存储。  
逐块写入完成后，通过监听 `end` 事件来处理上传完成的逻辑，并发送合适的响应。  
在任何失败的情况下，我们通过监听 `error` 事件来处理错误，并发送适当的错误响应。