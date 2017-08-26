<template>
  <div id="app">
  	
    <el-menu theme="dark" :default-active="activeIndex" mode="horizontal">
    		<el-menu-item index="1">首页</el-menu-item>
    		<el-menu-item index="2">品牌</el-menu-item>
    		<el-menu-item index="3">设计师</el-menu-item>
    		<el-submenu index="4">
    			<template slot="title">联系我们</template>
    			<el-menu-item index="4-1">电话</el-menu-item>
    			<el-menu-item index="4-2">地址</el-menu-item>
    			<el-menu-item index="4-3">地图导航</el-menu-item>
    		</el-submenu>
    		<p>仅用作演示</p>
    </el-menu>
    
    <el-row>
	  	<el-col :span="24">
	  		<div class="grid-content bg-purple">时尚购物车演示列表页</div>
	  	</el-col>
  	</el-row>
  	<el-row :gutter="20" class="wrapper">
  		<el-col :span="5" class="sidebar">
  			<div class="aside">
  				<h3>购物车 <i class="el-icon-date"></i></h3>
  				<div id="cart">
  					<span class="empty" v-if="cartFlag">购物车空空如也！</span>
  					<div class="cart-item" v-for="(item,index) in cartList" @mouseenter="check('cart',index)" @mouseleave="deleteFlag=false">
  						<div class="img-wrapper">
  							<img :src="'../src/assets/'+item.images[0]+'.jpg'" />
  							<span>{{item.title | truncate(8)}}</span>
  							<strong>￥{{item.price}}</strong>
  							<div v-show="deleteFlag && deleteIndex == index" class="el-icon-close" @click="cartDelete(index)"></div>
  						</div>  				
  						
  						<div class="line"></div>
  					</div>
  				</div>
  				<h3>分类购物 <i class="el-icon-menu"></i></h3>
  				<div class="buy categories">
  					<ul>
  						<li v-for="(item,index) in categoryList">
  							<a href="javascript:;" @click="check('category',index)">
  								<span>
  									<span class="x" :class="{'animation':checked[index] == 1 }"></span>
  									<span class="y" :class="{'animation':checked[index] == 1 }"></span>
  								</span>
  								{{item.categoryName}}
  							</a>
  						</li>
  						
  					</ul>
  				</div>
  				<h3>颜色分类 <i class="el-icon-star-on"></i></h3>
  				<div class="buy colors">
			    	<ul>
			        	<li><a href=""><span></span>Beige</a></li>
			            <li><a href=""><span style="background:#222"></span>Black</a></li>
			            <li><a href=""><span style="background:#6e8cd5"></span>Blue</a></li>
			            <li><a href=""><span style="background:#f56060"></span>Brown</a></li>
			            <li><a href=""><span style="background:#44c28d"></span>Green</a></li>
			        </ul>
        
			        <ul>
			        	<li><a href=""><span style="background:#999"></span>Grey</a></li>
			            <li><a href=""><span style="background:#f79858"></span>Orange</a></li>
			            <li><a href=""><span style="background:#b27ef8"></span>Purple</a></li>
			            <li><a href=""><span style="background:#f56060"></span>Red</a></li>
			            <li><a href=""><span style="background:#fff;border: 1px solid #e8e9eb;width:13px;height:13px;"></span>White</a></li>
			        </ul>        
    </div>
  			</div>
  		</el-col>
  		<el-col :span="19">
  			<div class="product">
  				<p>当前共 {{goodsList.length}} 条商品信息</p>
  				<div class="pro-list">
  				<el-row>
				  <el-col :span="8" v-for="(item, index) in goodsList" :key="index">
				    <el-card :body-style="{ padding: '0px' }" @mouseenter.native="checkSlide(index)" @mouseleave.native="slideIndex=false">
				    	<div class="make3d" :class="{'flip180':backIndex === index}" ref="reserve">
				    		<div class="front" :class="{'hidden':backIndex === index}">
				    	<img :src="'../src/assets/'+item.images[0]+'.jpg'" class="image">
				    		<div class="hidden" :class="{'mask':slideIndex === index}">
				      	<a href="javascript:;" class="c1" @click="add(index,item)">加入购物车</a>
				      	<a href="javascript:;" class="c2" @click="flip(index)">浏览图片</a>
				      </div>
				      <div  class="info" style="padding: 14px;" :class="{'info-hover':slideIndex === index}">
				        <span class="name" :title="item.title">{{item.title | truncate(8)}}</span>
				        <span class="price">{{item.price | currency('￥')}}</span>
				        <p>{{item.type}}</p>
				          
				          <div class="options">
				          	<strong>尺码：</strong>
				          	<span>{{item.sizes.toString()}}</span>
				          	<strong>颜色：</strong>
				          	<div class="colors">
				          		<div class="c-blue"><i></i></div>
	                            <div class="c-red"><i></i></div>
	                            <div class="c-white"><i></i></div>
	                            <div class="c-green"><i></i></div>
				          	</div> <br />    	
				          	<strong style="margin-top: 10px;">上新日期：</strong>
				          	<span>{{ currentDate }}</span>		         			          
				          </div>
				        
				      </div>
				    		</div>
				<div class="hidden" :class="{'back':backIndex === index}">
					      	<ul ref="getSlide">
					      		<li v-for="result in item.images">
					      	<img :src="'../src/assets/'+result+'.jpg'" class="image">
					      		</li>
					      	</ul>
					      	<div class="el-icon-close" @click="backIndex = false"></div>
					      	<div class="arrows-perspective">
		                        <div class="el-icon-arrow-left" @click="slideLeft(-1,index)"></div>
		                        <div class="el-icon-arrow-right" @click="slideRight(1,index)"></div>
	                       </div>
				      </div>
				    	</div>
				      
				    </el-card>
				    <img :src="'../src/assets/'+item.images[0]+'.jpg'" class="close" :class="{'clone':copyIndex === index,'animate':copyIndex === index && animateCart}">
				  </el-col>
				</el-row>
  				</div>
  			</div>
  			
  		</el-col>
  	</el-row>
  </div>

</template>

<script>
import './assets/css/main.css'
import axios from 'axios'
export default {
  data () {
    return {
	      activeIndex: '1',
	      cartFlag:true,
	      checkFlag:false,
	      categoryList:[],
	      goodsList:[],
	      curIndex:'',
	      checked:[],
	      status:false,
	      currentDate:(new Date()).toLocaleDateString(),
	      slideIndex:'',
	      copyIndex:'',
	      animateCart:false,
	      cartList:[],
	      deleteFlag:false,
	      deleteIndex:'',
	      backIndex:'',
	      result:0
  		}
	},
	computed:{
//		isChecked(){
//			return this.checked[this.curIndex];
//		}
	},
	mounted(){ 
		this.init();
		this.getGoods();
	},
  methods: {
  		check(str,index){
  			
  			if(str == 'category'){
  				this.curIndex = index;
				this.checked[index] = this.checked[index] ? 0 : 1;
				this.$forceUpdate();
  			}else if(str == 'cart'){
  				this.deleteIndex = index;
  				this.deleteFlag = true;
  			}

  		},
  		checkSlide(index){
  			this.slideIndex = index;
  		},
  		add(index,item){
  			this.copyIndex = index;
  			this.cartFlag = false;
			setTimeout(() => {
				this.animateCart = true;
			},1500);
			setTimeout(() => {
				this.copyIndex = '';
				this.animateCart = false;
				this.cartList.push(item);
			},1800);
  		},
  		cartDelete(index){
  			this.cartList.splice(index,1);
  			//购物车空置，显示提示信息
  			if (this.cartList.length == 0) {
  				this.cartFlag = true;
  			}
  		},
  		flip(index){
  			this.backIndex = index;
  		},
  		slideLeft(direction,index){
  			 
  			 let len = this.goodsList[index].images.length-1;
  			if (this.result <= -len*333 ) {
  				//越界止于尾图
  				this.$refs.getSlide[index].style.left = this.result+'px';
  			 	return;  			 	
  			 }
  			this.result += direction*333;
  			 this.$refs.getSlide[index].style.left = this.result+'px';
  			
  		},
  		slideRight(direction,index){
  			 
  			 let len = this.goodsList[index].images.length-1;
  			if (this.result >= 0) {
  				//越界止于尾图
  				this.$refs.getSlide[index].style.left = this.result+'px';
  			 	return;  			 	
  			 }
  			this.result += direction*333;
  			 this.$refs.getSlide[index].style.left = this.result+'px';
  			
  		},
  		init(){
			axios.get('../src/mock/category.json')
			.then(response => {
				this.categoryList = response.data;
			}).catch(err => {
				console.error('出现错误了:'+err);
			})
		},
		getGoods(){
			axios.get('../src/mock/getGoodsList.json')
			.then(response => {
				this.goodsList = response.data.goodslist;
			}).catch(err => {
				console.error('出现错误了:'+err);
			})
		}
  }
}
</script>

<style>
body{
	margin: 0;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  text-align: left;
  overflow: hidden;
}

</style>
