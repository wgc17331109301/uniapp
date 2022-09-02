<template>
	<view class="navbar">
		<view class="navbar-fiexd">
			<view :style="{height:statusBarHeight+'px'}"></view>
			<view class="navbar-content" :class="{search:isSearch}" :style="{height:navbarHerght+'px',width:windowWidth+'px'}" @click.stop="open">
				<view v-if="isSearch" class="navbar-content__search-icons" @click="back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<!-- 非搜索页 -->
				<view v-if="!isSearch" class="navbar-search">
					<uni-icons type="search" class="navbar-search__icon" size="16" color="#999"></uni-icons>
					<input type="text" class="navbar-search__text" placeholder="请输入您要查询的内容" />
				</view>
				<!-- 搜索页 -->
				<view v-else class="navbar-search">
					<input type="text" v-model="val" placeholder="请输入您要查询的内容" @input="inputChange" />
				</view>
			</view>
		</view>
		<view :style="{height:navbarHerght+statusBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		props:{
			isSearch:{
				type:Boolean,
				default:false
			},
			value:{
				type:[String,Number],
				default:''
			}
		},
		name:"navbar",
		data() {
			return {
				statusBarHeight:20,//状态栏高度
				navbarHerght:45,//导航栏默认值
				windowWidth:375,//屏幕宽度
				val:''
			};
		},
		watch:{
			value(newVal){
				this.val = newVal
			}
		},
		created() {
			//获取手机系统信息
			const info = uni.getSystemInfoSync()//同步获取系统信息 
			//console.log(info);
			//设置状态栏的高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			
			//uni.getMenuButtonBoundingClientRect这个api不支持H5，app-plus，mp-alipay
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			//获取微信开发者工具胶囊的位置信息
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			console.log(menuButtonInfo);
			//导航栏高度
			this.navbarHerght = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			//导航栏宽度
			this.windowWidth = menuButtonInfo.left
			// #endif
		},
		methods:{
			open(){
				if(this.isSearch) return
				uni.navigateTo({
					url:'/pages/home-search/home-search'
				})
			},
			inputChange(e){
				const{
					value
				} = e.detail
				this.$emit('input',value)
			},
			back(){
				uni.switchTab({
					url:'/pages/tabbar/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.navbar{
		.navbar-fiexd{
			position: fixed;//固定位置
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: $mk-base-color;
			.navbar-content{
				display: flex;
				justify-content: center;
				align-items: center;//这三行代码是垂直居中
				height: 45px;
				padding: 0 15px;
				box-sizing: border-box;//这个下列的内容在盒内展示
				.navbar-search{
					display: flex;
					align-items: center;
					padding: 0 10px;
					width: 100%;
					height: 30px;
					border-radius: 30px;
					background-color: #FFFFFF;
					.navbar-search__icon{
						margin-right: 10px;
					}
					.navbar-search__text{
						width: 100%;
						font-size: 14px;
						color: #999999;
					}
				}
				&.search{
					padding-left: 0;
					.navbar-content__search-icons{
						margin-left: 10px;
						margin-right: 10px;
					}
					.navbar-search{
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>
