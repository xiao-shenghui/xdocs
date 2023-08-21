import{_ as s,o as n,c as a,V as l}from"./chunks/framework.3745025a.js";const m=JSON.parse('{"title":"vue动态路由(传递参数)","description":"","frontmatter":{},"headers":[],"relativePath":"vue/vue-router/vue-router2.md","filePath":"vue/vue-router/vue-router2.md"}'),p={name:"vue/vue-router/vue-router2.md"},e=l(`<h1 id="vue动态路由-传递参数" tabindex="-1">vue动态路由(传递参数) <a class="header-anchor" href="#vue动态路由-传递参数" aria-label="Permalink to &quot;vue动态路由(传递参数)&quot;">​</a></h1><h2 id="传递参数的2种方式" tabindex="-1">传递参数的2种方式 <a class="header-anchor" href="#传递参数的2种方式" aria-label="Permalink to &quot;传递参数的2种方式&quot;">​</a></h2><h2 id="方式一-key-value-key-value" tabindex="-1">方式一： ?key=value&amp;key=value <a class="header-anchor" href="#方式一-key-value-key-value" aria-label="Permalink to &quot;方式一： ?key=value&amp;key=value&quot;">​</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 方式一：</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">通过URL设置？key=value&amp;key=value的形式传递参数</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">通过设置组件的生命周期函数内，this.$route.query 来获取路由参数</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-vue line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- app.vue --&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 在设置router-link to的属性值时,添加?key=value&amp;key=value --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">router-link</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">to</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/home?name=admin&amp;password=123456</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">HOME</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">router-link</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">router-view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!-- home.vue 或者组件home内 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">Vue.component(&quot;home&quot;,{</span></span>
<span class="line"><span style="color:#A6ACCD;">	template: &quot;#home&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">	created(){</span></span>
<span class="line"><span style="color:#A6ACCD;">		console.log(this.$route.query) </span></span>
<span class="line"><span style="color:#A6ACCD;">		//打印结果 {&#39;name&#39;:&#39;admin&#39;, &#39;password&#39;:&#39;123456&#39;}</span></span>
<span class="line"><span style="color:#A6ACCD;">	}</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="方式二-key-key" tabindex="-1">方式二： /:key/:key <a class="header-anchor" href="#方式二-key-key" aria-label="Permalink to &quot;方式二： /:key/:key&quot;">​</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">通过设置组件的路由规则path, 添加/:key/:key 来接收路由参数.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">通过URL设置/value/value 来传递参数</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">通过组件的生命周期函数内, this.$route.params 来获取路由参数.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-vue line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 路由规则内 --&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 设置该组件的路由规则,添加/:key/:key 来接收参数 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">const router = new VueRouter({</span></span>
<span class="line"><span style="color:#A6ACCD;">		routes: [</span></span>
<span class="line"><span style="color:#A6ACCD;">			{</span></span>
<span class="line"><span style="color:#A6ACCD;">				path: &quot;about/:name/:password&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">				component: about</span></span>
<span class="line"><span style="color:#A6ACCD;">			}</span></span>
<span class="line"><span style="color:#A6ACCD;">		]</span></span>
<span class="line"><span style="color:#A6ACCD;">	});</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- app 内 --&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 通过URL传递参数 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">router-link</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">to</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/about/admin1/987654321</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!-- about 组件内,--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!-- 在生命周期函数内,通过this.$route.params 获取路由参数 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">Vue.component(&quot;about&quot;,{</span></span>
<span class="line"><span style="color:#A6ACCD;">		template: &quot;#about&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">		created(){</span></span>
<span class="line"><span style="color:#A6ACCD;">			console.log(this.$route.params)</span></span>
<span class="line"><span style="color:#A6ACCD;">		}</span></span>
<span class="line"><span style="color:#A6ACCD;">	})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="完整案例" tabindex="-1">完整案例 <a class="header-anchor" href="#完整案例" aria-label="Permalink to &quot;完整案例&quot;">​</a></h2><div class="language-vue line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;!-- </span></span>
<span class="line"><span style="color:#A6ACCD;">            动态路由的2种方式：</span></span>
<span class="line"><span style="color:#A6ACCD;">            1. 方式一：</span></span>
<span class="line"><span style="color:#A6ACCD;">            通过URL设置?key=value&amp;key=value的方式传递参数。</span></span>
<span class="line"><span style="color:#A6ACCD;">            通过组件的生命周期，设置this.$route.query获取参数。</span></span>
<span class="line"><span style="color:#A6ACCD;">            2. 方式二：</span></span>
<span class="line"><span style="color:#A6ACCD;">            通过设置组件的路由规则path，/:key/:key的方式接收参数。</span></span>
<span class="line"><span style="color:#A6ACCD;">            通过URL设置/value/value的方式，传递参数。</span></span>
<span class="line"><span style="color:#A6ACCD;">            通过组件的生命周期，设置this.$route.params获取参数。</span></span>
<span class="line"><span style="color:#A6ACCD;">         --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;!-- 路由 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;router-link to=&quot;/&quot;&gt;到主页&lt;/router-link&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;router-link to=&quot;/home?name=admin&amp;password=123456789&quot;&gt;到home&lt;/router-link&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;router-link to=&quot;/about/admin2/987654321&quot;&gt;到about&lt;/router-link&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;!-- 渲染 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;router-view&gt;&lt;/router-view&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;template id=&quot;home&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;h1&gt;我是home组件&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;h1&gt;我是路由参数：{{queryURL}}&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/template&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;template id=&quot;about&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;h1&gt;我是about组件&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;h1&gt;我是路由参数：{{queryURL2}}&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 创建全局组件</span></span>
<span class="line"><span style="color:#A6ACCD;">        const home = Vue.component(&#39;home&#39;, {</span></span>
<span class="line"><span style="color:#A6ACCD;">            template: &quot;#home&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            data() {</span></span>
<span class="line"><span style="color:#A6ACCD;">                return {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    queryURL: []</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            // 在created生命周期内，获取和使用</span></span>
<span class="line"><span style="color:#A6ACCD;">            created() {</span></span>
<span class="line"><span style="color:#A6ACCD;">                console.log(this.$route.query);</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            mounted() {</span></span>
<span class="line"><span style="color:#A6ACCD;">                this.queryURL.push(this.$route.query);</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        });</span></span>
<span class="line"><span style="color:#A6ACCD;">        // </span></span>
<span class="line"><span style="color:#A6ACCD;">        const about = Vue.component(&#39;about&#39;, {</span></span>
<span class="line"><span style="color:#A6ACCD;">            template: &quot;#about&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            data() {</span></span>
<span class="line"><span style="color:#A6ACCD;">                return {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    queryURL2: []</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            created() {</span></span>
<span class="line"><span style="color:#A6ACCD;">                console.log(this.$route);</span></span>
<span class="line"><span style="color:#A6ACCD;">                console.log(this.$route.params);</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            mounted() {</span></span>
<span class="line"><span style="color:#A6ACCD;">                this.queryURL2.push(this.$route.params);</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        });</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 创建路由对象</span></span>
<span class="line"><span style="color:#A6ACCD;">        const router = new VueRouter({</span></span>
<span class="line"><span style="color:#A6ACCD;">            // 编写路由规则</span></span>
<span class="line"><span style="color:#A6ACCD;">            routes: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    path: &quot;/&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">                {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    path: &quot;/home&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    name: &quot;home&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    component: home</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">                {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    // 设置path路径来接收参数</span></span>
<span class="line"><span style="color:#A6ACCD;">                    path: &quot;/about/:name/:password&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    name: &quot;about&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    component: about</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">            ],</span></span>
<span class="line"><span style="color:#A6ACCD;">        });</span></span>
<span class="line"><span style="color:#A6ACCD;">        const vm = new Vue({</span></span>
<span class="line"><span style="color:#A6ACCD;">            el: &quot;#app&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            router: router</span></span>
<span class="line"><span style="color:#A6ACCD;">        });</span></span>
<span class="line"><span style="color:#A6ACCD;">        // console.log(vm);</span></span>
<span class="line"><span style="color:#A6ACCD;">        // console.log(vm.$route);   //打印挂载到vue上面路由对象    </span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/script&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br></div></div>`,10),r=[e];function t(o,c,i,u,b,C){return n(),a("div",null,r)}const y=s(p,[["render",t]]);export{m as __pageData,y as default};
