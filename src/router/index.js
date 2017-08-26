//导入组件、插件 配置路由
import Vue from 'vue'
import Router from 'vue-router'
import App from './../App.vue'
//import Vue from 'vue'
//import Vue from 'vue'

Vue.use(Router)

export default new Router({
	routes:[
	{
	path:'/',
	name:'App',
	component:App
	}
	
	]
})
