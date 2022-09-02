<template>
	<view class="tab">
		<scroll-view scroll-x class="tab-scroll">
			<view class="tab-scroll__box">
				<view class="tab-scroll__item" :class="{active:activeIndex === index}" v-for="(item,index) in list" :key="index" @click="clickTab(item,index)">{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="tab-icons">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tab",
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			tabIndex:{
				type:Number,
				default:0
			}
		},
		//可以监听data，props值的变化
		watch:{
			tabIndex(newVal,oldVal){
				this.activeIndex = newVal
			}
		},
		data() {
			return {
				activeIndex:0
			};
		},
		methods:{
			clickTab(item,index){
				//console.log(item,index);
				this.activeIndex = index
				//触发当前实例上的事件。附加参数都会传给监听器回调。 
				this.$emit('tab',{
					data:item,
					index:index
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab{
		display: flex;
		width: 100%;
		border-bottom: 2px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;//盒内元素
		
		.tab-scroll{
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			
			.tab-scroll__box{
				display: flex;
				align-items: center;
				flex-wrap: nowrap;//不换行
				height: 45px;
				box-sizing: border-box;
				.tab-scroll__item{
					flex-shrink: 0;//不让元素进行挤压
					padding: 0 10px;
					color: #333333;
					font-size: 14px;
					
					&.active{
						color: $mk-base-color;
					}
				}
			}
		}
		
		.tab-icons{
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;
			
			&::after{
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
	}
</style>
