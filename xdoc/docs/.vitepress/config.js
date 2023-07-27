module.exports = {
  title: 'XDocs',
  description: '一个用于记录的vitepress静态博客',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // 网页标题
    siteTitle: 'XDocs',
    // 配置导航栏nav
    nav: [
      // text 标题
      // link 链接
      // target 打开方式
      {
        // items子级下拉框
        text: 'Javascript',
        items: [
          { text: 'JS基础', link: '/javascript/jsbasic/index' },
          { text: 'JS高级', link: '/javascript/jsdeep/index' },
          { text: 'ES6及6+', link: '/javascript/es6/index' },
        ]
      },
      {
        // items子级下拉框
        text: 'Vue',
        items: [
          { text: 'Vue2', link: '/vue/vue2/index' },
          { text: 'Vue-Router', link: '/vue/vue-router/index' },
          { text: 'VueX', link: '/vue/vuex/index' },
          { text: 'Vue3', link: '/vue/vue3/index' },
        ]
      },
      {
        // items子级下拉框
        text: 'React',
        items: [
          { text: 'JSX', link: '/react/jsx/JSX' },
          { text: 'React18', link: '/react/react18/create-react-app' }
        ]
      },
      {
        text: '工具库',
        items: [
          { text: 'Axios',link: '/tool/axios/index' },
          { text: 'Element-Ui',link: '/tool/element-ui/index' },
          { text: 'jQuery',link: '/tool/jquery/jQuery' },
        ]
      },
      {
        text: '杂七杂八',
        items: [
          { text: 'Express',link: '/other/express' },
          { text: 'Gitee',link: '/other/git的使用体验' },
          { text: 'Typescript',link: '/other/typescript/index' },
          { text: 'Less',link: '/other/less的使用' },
          { text: 'Mysql',link: '/other/mysql' },
          { text: 'Nvm',link: '/other/nvm' }
        ]
      },
      { text: '配置网站', link: 'https://vitepress.dev/reference/default-theme-nav' },
      
    ],
    // 配置侧边栏sidebar
    sidebar: {
      '/vue/vue2': [
        {
          text: 'Vue2',
          collapsed: true,
          // items,子级
          items: [
            { text: '导航目录', link: '/vue/vue2/index' },
            { text: 'vue指令', link: '/vue/vue2/vue指令' },
            { text: 'vue组件', link: '/vue/vue2/vue组件' },
            { text: 'vue插槽', link: '/vue/vue2/vue插槽' },
            { text: 'vue父子数据互传', link: '/vue/vue2/vue父子数据互传' },
            { text: 'vue扩展和插件', link: '/vue/vue2/vue扩展和插件' },
            { text: 'vue-render渲染函数', link: '/vue/vue2/vue-render渲染函数' }
          ]
        }
      ],
      '/vue/vue3': [
        {
          text: 'Vue3',
          collapsed: true,
          // items,子级
          items: [
            { text: '导航目录', link: '/vue/vue3/index' }
          ]
        }
      ],
      '/vue/vue-router': [
        {
          text: 'Vue-Router',
          collapsed: true,
          // items,子级
          items: [
            { text: '导航目录', link: '/vue/vue-router/index' },
            { text: 'vue动态路由', link: '/vue/vue-router/vue动态路由' },
            { text: 'vue路由', link: '/vue/vue-router/vue路由' },
          ]
        }
      ],
      '/vue/vuex': [
        {
          text: 'VueX',
          collapsed: true,
          // items,子级
          items: [
            { text: '导航目录', link: '/vue/vuex/index' },
            { text: 'vuex状态管理', link: '/vue/vuex/vuex状态管理' },
          ]
        }
      ],
      '/react/jsx': [
        {
          text: 'JSX', link: '/react/jsx'
        }
      ],
      '/react/react18': [
        {
          text: 'React18',
          items: [
            { text: 'create-react-app', link: '/react/react18/create-react-app' },
            { text: 'React基础', link: '/react/react18/React基础' },
          ]
        }
      ],
      '/tool/axios': [
        {
          text: 'Axios',
          items: [
            { text: 'index', link: '/tool/axios/index' },
            { text: 'axios基本使用', link: '/tool/axios/axios基本使用' },
            { text: 'axios拦截器', link: '/tool/axios/axios拦截器' },
          ]
        }
      ],
      '/tool/element-ui': [
        {
          text: 'ElementUI',
          items: [
            { text: 'index', link: '/tool/element-ui/index' },
            { text: 'el-row及el-col源码', link: '/tool/element-ui/el-row及el-col源码' },
            { text: 'el-container源码', link: '/tool/element-ui/el-container源码' },
            { text: 'el-radio源码', link: '/tool/element-ui/el-radio源码' },
          ]
        }
      ],
      '/tool/jquery': [
        {
          text: 'jQuery', link: '/tool/jquery/jQuery' 
        }
      ],
      '/javascript/jsbasic': [
        {
          text: 'JS基础',
          items: [
            { text: 'index', link: '/javascript/jsbasic/index' },
            { text: 'JS基础', link: '/javascript/jsbasic/JS基础' },
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
            { text: 'JS进阶', link: '/javascript/jsdeep/JS进阶' },
            { text: '面试题', link: '/javascript/jsdeep/面试题' },
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
      '/other/typescript': [
        {
          text: 'Typescript',
          items: [
            { text: 'index', link: '/other/typescript/index' },
            { text: '认识typescript', link: '/other/typescript/认识typescript' },
            { text: 'typescript语法', link: '/other/typescript/typescript语法' },
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