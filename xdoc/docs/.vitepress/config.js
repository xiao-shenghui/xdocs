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
        text: 'Vue',
        items: [
          { text: 'Vue2', link: '/vue/vue2/index' },
          { text: 'Vue-Router', link: '/vue/vue-router/index' },
          { text: 'VueX', link: '/vue/vuex/index' },
          { text: 'Vue3', link: '/vue/vue3/index' },
        ]
      },
      { text: '配置网站', link: 'https://vitepress.dev/reference/default-theme-nav' },
      
    ],
    // 配置侧边栏sidebar
    sidebar: {
      '/vue/vue2': [
        {
          text: 'Vue2',
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
          // items,子级
          items: [
            { text: '导航目录', link: '/vue/vue3/index' }
          ]
        }
      ],
      '/vue/vue-router': [
        {
          text: 'Vue-Router',
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
          // items,子级
          items: [
            { text: '导航目录', link: '/vue/vuex/index' },
            { text: 'vuex状态管理', link: '/vue/vuex/vuex状态管理' },
          ]
        }
      ],
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