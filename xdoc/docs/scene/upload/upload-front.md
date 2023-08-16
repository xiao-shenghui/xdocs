# 上传文件之前端
> 在 Web 开发中，`文件上传`是一个常见的需求。  
> 原生js提供了多种方式来实现文件上传，包括使用 `FormData 类型`、`Base64 类型`、`多文件上传`、`大文件分片以及断点续传`等。
## HTML配置
### input属性
> 虽说都是使用`input:file`实现的上传，但是有些配置需要了解。
- `accept`属性: 限制接受的文件`格式/类型`
- `multiple`属性: 是否`多选`
```html
<input type="file" multiple accept="image/*">
<!-- accept唯一文件类型说明 -->
<!-- 
1. 以.开头的合法“文件扩展名”。例如: .jpg .png .jpeg .doc
2. 以媒体类型+/*,表示可接受的媒体类型
  2.1 image/*  任何图片文件
  2.2 audio/* 任何音频文件
  2.3 video/* 任何视频文件
 -->
```

### 获取文件信息
> 上传以后，`input.value`则返回要给`File`类型的`FileList`对象。   
> 在该对象内部，有`size`,`name`,`type`等有用的属性。
```js
ipt.onchange = function(){
  // 文件大小
  console.log(ipt.value.files[0].size);
  // 文件名
  console.log(ipt.value.files[0].name);
  // 文件类型
  console.log(ipt.value.files[0].type);
}
```

## FormData
> FormData 是用于`创建表单数据`的一种类型，它可以用于实现文件上传。  
> 流程：使用`FormData`实例化的对象，使用`append`方法，添加数据。  
> 将该对象传递给后端即可。
```javascript
const fileInput = document.getElementById('file-input');
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', () => {
  const files = fileInput.files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('file', files[i]);
  }

  // 发送 FormData 对象到服务器，执行文件上传操作
  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // 处理上传成功后的响应结果
    })
    .catch(error => {
      console.error(error);
      // 处理上传失败的情况
    });
});
```
1. 在上述示例中，我们通过 `fileInput` 元素获取用户选择的文件，然后使用 `FormData` 类型创建一个表单对象 `formData`。  
2. 通过使用 `append` 方法，我们将每个文件添加到表单对象中，并使用 `'file'` 作为文件的字段名。
3. 最后，我们通过 `fetch` 函数将 `formData` 对象发送到服务器的 `/upload` 路径，实现文件上传操作。(其中`fetch` 函数发送一个 POST 请求，并将 `formData` 设置为`请求的 body`。)

## 拖拽上传
- HTML拖拽的API,详情见：[HTML5拖拽](../../javascript/html5/draggable&touch)

```javascript
const dropZone = document.getElementById('drop-zone');

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('drag-over');
  
  const files = event.dataTransfer.files;
  
  // 处理上传的文件
  uploadFiles(files);
});

function uploadFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const formData = new FormData();
    formData.append('file', file);
    
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        if (response.ok) {
          console.log('文件上传成功');
        } else {
          console.error('文件上传失败');
        }
      })
      .catch(() => {
        console.error('请求错误');
      });
  }
}
```

在该示例中，在 `uploadFiles` 函数中，我们使用 `fetch` 函数来发送 POST 请求并上传文件。 将文件添加到 `FormData` 对象中，并在 Fetch 请求中传入该对象作为请求的 `body`。  
一旦得到响应，我们通过检查 `response.ok` 来确认是否成功上传文件。如果响应状态码为 200，则表示上传成功；其他状态码则表示上传失败。  
如果在上传过程中遇到任何错误，我们将捕获并在控制台输出错误消息。  
请注意: 在 Fetch API 中，响应对象不会抛出错误状态。相反，它只是将 `ok` 属性设置为 `true`（状态码在 200-299 范围内）或 `false`（其他状态码）。  
因此，在处理上传结果时，我们需要检查响应的 `ok` 属性来确定是否上传成功。

## BASE64
> Base64 是一种将`二进制数据`编码为`ASCII 字符串`的编码方式。  
> 在前端文件上传时，可以将文件转换为 Base64 编码的字符串，然后通过 AJAX 或其他方式发送到后端。  
> 流程：使用`FileReader`实例化的对象，使用`readAsDataURL`方法，`转换`文件对象。
> 调用该对象的`onload`方法，回调函数上监听`上传事件对象e.target.result`，就是`BASE64`类型。

```javascript
const fileInput = document.getElementById('file-input');
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const base64Data = reader.result;

    // 发送 base64Data 字符串到服务器，执行文件上传操作
    fetch('/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: base64Data }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // 处理上传成功后的响应结果
      })
      .catch(error => {
        console.error(error);
        // 处理上传失败的情况
      });
  };

  reader.readAsDataURL(file);
});
```
1. 在上述示例中，我们通过 `fileInput` 元素获取用户选择的文件，并创建一个 `FileReader` 对象，用于读取文件。使用 `reader` 对象的 `onloadend` 事件，当文件读取完成时调用回调函数。
2. 在回调函数中，我们将文件的内容转换为 Base64 编码的字符串，并将它发送到服务器的 `/upload` 路径，执行文件上传操作。
3. 需要注意的是，这里我们通过 `Content-Type` 头部将数据标记为 JSON 类型，并使用 `JSON.stringify` 方法将数据转换为 JSON 字符串。

## 多文件上传
> 在实际开发中，可能需要同时上传多个文件。  
- 以下是针对多文件上传的示例代码：
```javascript
const fileInputs = document.getElementsByClassName('file-input');
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', () => {
  const formData = new FormData();

  for (let i = 0; i < fileInputs.length; i++) {
    const files = fileInputs[i].files;

    for (let j = 0; j < files.length; j++) {
      formData.append('file', files[j]);
    }
  }

  // 发送 FormData 对象到服务器，执行文件上传操作
  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // 处理上传成功后的响应结果
    })
    .catch(error => {
      console.error(error);
      // 处理上传失败的情况
    });
});
```
1. 在上述示例中，我们使用 `getElementsByClassName` 方法获取所有的 `file-input` 元素，并创建一个 `FormData` 对象 `formData`。
2. 然后，我们遍历每个 `file-input` 元素，获取其对应的文件，然后通过 `append` 方法将文件添加到 `formData` 中。
3. 最后，我们通过 `fetch` 函数将 `formData` 对象发送到服务器的 `/upload` 路径，实现多文件上传操作。

## 大文件分片上传
> 在处理大文件上传时，将整个文件一次性上传可能会导致性能问题。  
> 为了优化大文件上传的性能，可以使用`分片上传`的方式，将文件分成多个小块并逐个上传。
```javascript
// 省略文件分片逻辑，假设每个文件块的数据为 chunkData
const formData = new FormData();
formData.append('chunk', chunkData);

// 发送分片数据到服务器，执行分片上传操作
fetch('/upload-chunk', {
  method: 'POST',
  body: formData,
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // 处理上传成功后的响应结果
  })
  .catch(error => {
    console.error(error);
    // 处理上传失败的情况
  });
```
1. 在上述示例中，我们假设文件已经被分成了多个块，每个块的数据存储在变量 `chunkData` 中。我们使用 `FormData` 类型创建一个 `formData` 对象，并将当前块的数据附加到 `formData` 中。
2. 然后，我们通过 `fetch` 函数将分片数据发送到服务器的 `/upload-chunk` 路径，执行分片上传操作。在发送请求时，可以使用适当的请求方法（如 `POST`）和相应的请求头部。
3. 最后，我们可以处理上传成功后的响应结果，并在需要时处理上传失败的情况。
**注意：** 上述示例仅展示了分片上传的基本原理，实际实现中还需要考虑分片的合并、上传进度的跟踪等其他细节。

## 断点续传
> 断点续传是指在文件上传过程中，如果上传中断，可以`恢复`上传，并从`断点`处继续上传。
```javascript
const resumeButton = document.getElementById('resume-button');
let pausedAt = 0;

resumeButton.addEventListener('click', () => {
  // 断点续传，从 pausedAt 处恢复上传
  uploadFile(pausedAt);
});

function uploadFile(startIndex = 0) {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  const chunkSize = 1024 * 1024; // 每次上传的块大小，这里设置为 1MB
  const totalChunks = Math.ceil(file.size / chunkSize);
  const chunkIndex = Math.floor(startIndex / chunkSize);
  let chunk = null;

  if (chunkIndex < totalChunks) {
    const startByte = chunkIndex * chunkSize;
    const endByte = Math.min(startByte + chunkSize, file.size);
    chunk = file.slice(startByte, endByte);
  }

  if (!chunk) {
    console.log('文件上传完成');
    return;
  }

  const formData = new FormData();
  formData.append('chunk', chunk);
  formData.append('chunkIndex', chunkIndex);
  formData.append('totalChunks', totalChunks);

  fetch('/upload-chunk', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.chunkIndex === totalChunks - 1) {
        console.log('文件上传完成');
      } else {
        pausedAt = (data.chunkIndex + 1) * chunkSize;
        }
        // 断点处存储的值，用于恢复上传
        localStorage.setItem('pausedAt', pausedAt);
      })
      .catch(error => {
        console.error(error);
        // 处理上传失败的情况
      });
}

// 页面加载时检查是否有断点
window.addEventListener('DOMContentLoaded', () => {
  const pausedAtValue = localStorage.getItem('pausedAt');
  if (pausedAtValue) {
    pausedAt = parseInt(pausedAtValue);
    resumeButton.disabled = false;
  }
});
```
1. 在上述示例代码中，我们定义了一个 `resumeButton` 元素，用来触发断点续传。定义了一个变量 `pausedAt`，用于存储上传暂停的位置。
2. 当点击 `resumeButton` 按钮时，我们会调用 `uploadFile` 函数，并将 `pausedAt` 作为参数传递。 这样，我们可以继续从断点处上传文件。
3. 在 `uploadFile` 函数中，我们根据 `startIndex` 计算出当前块的索引，并获取对应的文件块。
4. 然后创建一个 `FormData` 对象，并将当前块的数据和相关信息添加到表单中。
5. 接下来，我们使用 `fetch` 函数将表单数据发送到服务器的 `/upload-chunk` 路径，并根据服务器返回的结果进行相应的处理。
6. 如果当前块是最后一个块，表示文件上传完成。否则，我们更新 `pausedAt` 的值，并将其存储到 localStorage 中，以便下次恢复上传。
7. 最后，我们使用 `localStorage` 在页面加载时检查是否有断点数据，并根据需要设置 `resumeButton` 的状态。

**注意：** 上述示例代码仅展示了断点续传的基本实现，实际实现还需要考虑断点的管理、上传进度的跟踪等其他细节。