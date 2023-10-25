module.exports = {
  title: 'XDocs',
  description: '一个用于记录的vitepress静态博客',
  base: '/xdocs.github.io/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // 社交账号
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiao-shenghui/xdocs' }
    ],
    // 网页标题
    siteTitle: 'XDocs',
    // 指定大纲的层级
    outline: 'deep',
    // 配置导航栏nav
    nav: [
      // text 标题
      // link 链接
      // target 打开方式
      {
        // items子级下拉框
        text: 'JS & TS',
        items: [
          { text: '数据结构与算法', link: '/javascript/dataStructure' },
          { text: '计算机网络', link: '/javascript/computerNet' },
          { text: 'HTML5新增', link: '/javascript/html5/draggable&touch' },
          { text: 'JS基础', link: '/javascript/jsbasic/index' },
          { text: 'JS高级', link: '/javascript/jsdeep/index' },
          { text: 'ES6及6+', link: '/javascript/es6/index' },
          { text: 'Ajax+', link: '/javascript/Ajax' },
          { text: 'jQuery',link: '/tool/jquery/jQuery' },
          { text: 'TS导航', link: '/typescript/index' },
          { text: 'TS基础', link: '/typescript/typescript' },
          { text: 'TS合集', link: '/typescript/typescript-basic' },
          { text: 'JS-To-Ts', link: '/typescript/js-to-ts' },
        ]
      },
      {
        // items子级下拉框
        text: 'Vue & React',
        items: [
          { text: 'Vue2', link: '/vue/vue2/index' },
          { text: 'Vue-Router', link: '/vue/vue-router/index' },
          { text: 'VueX', link: '/vue/vuex/vuex' },
          { text: 'Vue3', link: '/vue/vue3/index' },
          { text: 'Pina', link: '/vue/pina/pina' },
          { text: 'React-JSX', link: '/react/jsx/JSX' },
          { text: 'React18', link: '/react/react18/create-react-app' }
        ]
      },
      {
        text: '小程序',
        items: [
          { text: '原生小程序', link: '/miniProgram/native' },
          { text: 'Uniapp', link: '/miniProgram/uniapp' },
          { text: 'React-Native', link: '/miniProgram/reactnative' }
        ]
      },
      {
        text: '业务场景',
        items: [
          { text: '文件上传', link: '/scene/upload/index' },
          { text: '瀑布流', link: '/scene/water/waterfall' },
          { text: '骨架屏', link: '/scene/skeleton/index' },
          { text: 'WebSocket',link: '/tool/websocket' },
          { text: '直播流',link: '/scene/liveplayer' },
        ]
      },
      {
        text: '工程化',
        items: [
          { text: 'Axios',link: '/tool/axios/index' },
          { text: 'Element-Ui',link: '/tool/element-ui/index' },
          { text: 'Nodejs',link: '/tool/node/index' },
          { text: 'Less',link: '/tool/less' },
          { text: 'Webpack',link: '/tool/webpack' },
        ]
      },
      {
        text: '部署和测试',
        items: [
          { text: 'Vitest',link: '/tool/vitest' },
          { text: 'Mysql',link: '/other/mysql' },
          { text: 'Gitee',link: '/other/git' },
          { text: 'Nvm',link: '/other/nvm' },
          { text: 'Npm包推荐',link: '/other/npm-recommend' },
        ]
      },
      {
        text: '源码解析', link: '/resource/index'
      },
      { text: '配置网站', link: 'https://vitepress.dev/reference/default-theme-nav' },
      
    ],
    // 配置侧边栏sidebar
    sidebar: {
      '/vue/vue2': [
        {
          text: 'Vue2',
          // collapsed: true,
          // items,子级
          items: [
            { text: '导航目录', link: '/vue/vue2/index' },
            { text: 'vue指令', link: '/vue/vue2/vue-directive' },
            { text: 'vue组件', link: '/vue/vue2/vue-component1' },
            { text: 'vue插槽', link: '/vue/vue2/vue-slot' },
            { text: 'vue父子数据互传', link: '/vue/vue2/vue-component2' },
            { text: 'vue跨组件通信-EventBus', link: '/vue/vue2/vue-eventbus' },
            { text: 'vue扩展和插件', link: '/vue/vue2/vue-extend-plugin' },
            { text: 'vue-render渲染函数', link: '/vue/vue2/vue-render' },
            { text: 'vue-从零开始', link: '/vue/vue2/vue-all' },
            { text: 'vue笔记总结', link: '/vue/vue2/vue-total' }
          ]
        }
      ],
      '/vue/vue3': [
        {
          text: 'Vue3',
          // collapsed: true,
          // items,子级
          items: [
            { text: '导航目录', link: '/vue/vue3/index' },
            { text: 'vue3基础', link: '/vue/vue3/basic' },
            { text: 'vue3深入', link: '/vue/vue3/deep' },
            { text: 'vue3全局API', link: '/vue/vue3/API-global' },
            { text: 'vue3组合式API', link: '/vue/vue3/API-setup' },
            { text: 'vue3内置内容', link: '/vue/vue3/API-build' },
            { text: 'vue3进阶API', link: '/vue/vue3/API-deep' },
            { text: 'vue3-setup语法糖', link: '/vue/vue3/Script-setup' },
          ]
        }
      ],
      '/vue/vue-router': [
        {
          text: 'Vue-Router',
          // collapsed: true,
          // items,子级
          items: [
            { text: '导航目录', link: '/vue/vue-router/index' },
            { text: 'vue2-路由基础', link: '/vue/vue-router/vue-router' },
            { text: 'vue2-动态路由匹配', link: '/vue/vue-router/vue-router2' },
            { text: 'vue2-路由总结', link: '/vue/vue-router/vue-total' },
            { text: 'vue3-路由', link: '/vue/vue-router/vue3-router' },
          ]
        }
      ],
      '/react/react18': [
        {
          text: 'React18',
          items: [
            { text: 'create-react-app', link: '/react/react18/create-react-app' },
            { text: 'React基础', link: '/react/react18/react-basic' },
          ]
        }
      ],
      '/tool/axios': [
        {
          text: 'Axios',
          items: [
            { text: 'index', link: '/tool/axios/index' },
            { text: 'axios基本使用', link: '/tool/axios/axios-basic' },
            { text: 'axios拦截器', link: '/tool/axios/axios-interceptors' },
          ]
        }
      ],
      '/tool/element-ui': [
        {
          text: 'ElementUI',
          items: [
            { text: 'index', link: '/tool/element-ui/index' },
            { text: 'el-row及el-col源码', link: '/tool/element-ui/el-row+el-col' },
            { text: 'el-container源码', link: '/tool/element-ui/el-container' },
            { text: 'el-radio源码', link: '/tool/element-ui/el-radio' },
          ]
        }
      ],
      '/tool/node': [
        { 
          text: 'Nodejs',
          items: [
            { text: 'index', link: '/tool/node/index' },
            { text: 'Nodejs', link: '/tool/node/nodejs' },
            { text: 'Express', link: '/tool/node/express' },
            { text: 'Koa', link: '/tool/node/koa' },
            { text: 'Express VS Koa', link: '/tool/node/express-koa' },
          ] 
        }
      ],
      '/javascript/html5': [
        {
          text: 'HTML5新增',
          items: [
            { text: 'index', link: '/javascript/html5/index' },
            { text: '拖拽和触摸', link: '/javascript/html5/draggable&touch' },
            { text: 'Canvas画板', link: '/javascript/html5/canvas' }
          ]
        }
      ],
      '/javascript/jsbasic': [
        {
          text: 'JS基础',
          items: [
            { text: 'index', link: '/javascript/jsbasic/index' },
            { text: 'JS基础', link: '/javascript/jsbasic/js-basic' },
            { text: 'DOM', link: '/javascript/jsbasic/DOM' },
            { text: 'BOM', link: '/javascript/jsbasic/BOM' }
          ]
        }
      ],
      '/javascript/jsdeep': [
        {
          text: 'JS高级',
          items: [
            { text: 'index', link: '/javascript/jsdeep/index' },
            { text: 'JS进阶', link: '/javascript/jsdeep/js-deep' },
            { text: '面试题', link: '/javascript/jsdeep/test' },
          ]
        }
      ],
      '/javascript/es6': [
        {
          text: 'ES6-6+',
          items: [
            { text: 'index', link: '/javascript/es6/index' },
            { text: 'ES6+', link: '/javascript/es6/ES6+' },
            { text: 'Promise', link: '/javascript/es6/Promise' },
          ]
        }
      ],
      '/resource/': [
        {
          text: '源码学习',
          items: [
            { text: 'index', link: '/resource/index' },
            { text: 'Vue2源码解析', link: '/resource/vue2-resource' },
            { text: 'Vue2属性和方法大全', link: '/resource/vue2-attr' },
            { text: 'Vue2心得体会', link: '/resource/vue2-note' },
            { text: '理解设计模式', link: '/resource/js-design-model' },
          ]
        }
      ],
      '/scene/upload/': [
        {
          text: '文件上传',
          items: [
            { text: 'index', link: '/scene/upload/index' },
            { text: '文件上传之前端', link: '/scene/upload/upload-front' },
            { text: '文件上传之后端', link: '/scene/upload/upload-back' },
            { text: '完整上传案例-formData', link: '/scene/upload/formData' },
          ]
        }
      ],
      '/scene/skeleton/': [
        {
          text: '骨架屏',
          items: [
            { text: 'index', link: '/scene/skeleton/index' },
            { text: '初步认识骨架屏', link: '/scene/skeleton/skeleton' },
          ]
        }
      ]
    },
    // 底部,支持a标签
    footer: {
      message: '一个前端小菜鸟的静态博客---xdocs',
      copyright: 'Copyright © 2019-present <a href="https://github.com/yyx990803">Evan You</a>'
    },
    // 搜索框
    search: {
      provider: 'local',
    }
  }
}