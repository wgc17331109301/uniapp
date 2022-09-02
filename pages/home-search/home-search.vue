<template>
	<view class="home">
		<navbar :isSearch="true" v-model="value" @input="change"></navbar>
		<view class="home-list">
			<view v-if="is_histroy" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view v-if="historyLists.length > 0" class="label-content">
					<view class="label-content__item" v-for="item in historyLists" @click="openHistroy(item)">{{item.name}}</view>
				</view>
				<view v-else class="no-data">
					没有搜索数据
				</view>
			</view>
			<list-srcoll v-else class="list-srcoll">
				<view v-if="searchList.length > 0">
					<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
					<list-card :item="item" v-for="item in searchList" :key="item._id" mode="base" @click="setHistory"></list-card>
				</view>
				<view v-if="searchList.length === 0 && !loading" class="no-data">
					没有搜索到相关数据
				</view>
			</list-srcoll>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				is_histroy:true,
				searchList:[],
				value:'',
				loading:false
			}
		},
		computed:{
			...mapState(['historyLists'])
		},
		onLoad() {
			//this.getSearch()
		},
		methods: {
			openHistroy(item){
				this.value = item.name
				this.getSearch(this.value)
			},
			setHistory(){
				this.$store.dispatch('set_history',{
					name:this.value
				})
			},
			clear(){
				this.$store.dispatch('clearHistory')
				uni.showToast({
					title:'清空完成'
				})
			},
			change(value){
				if(!value){
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(value)
					return
				}
				//做标记
				if(!this.mark){
					this.mark = true
					this.timer = setTimeout(()=>{
						this.mark = false
						this.getSearch(value)
					},1000)
				}
			},
			getSearch(value){
				if(!value){
					this.searchList = []
					this.is_histroy = true
					return
				}
				this.is_histroy = false
				this.loading = true
				this.$api.get_search({
					value
				}).then(res=>{
					console.log(res);
					const {data} = res
					this.loading = false
					this.searchList = data
				}).catch(()=>{
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	
	.home{
		display: flex;
		flex-direction: column;
		flex: 1;
		
		.label-box{
			background-color: #FFFFFF;
			margin-bottom: 10px;
			
			.label-header{
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;
				
				.label-title{
					color: $mk-base-color;
				}
				
				.label-clear{
					color: #30b33a;
					font-weight: bold;
				}
			}
			
			.label-content{
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				
				.label-content__item{
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					font-size: 14px;
					color: #666;
					border: 1px #666 solid;
				}
			}
		}
	}
	
	.no-data{
		height: 200px;
		line-height: 200px;
		width: 100%;
		text-align: center;
		font-size: 12px;
		color: #666;
	}
</style>
