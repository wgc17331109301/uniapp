<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab__box">
				<view class="follow-tab__item" :class="{active:activeIndex === 0}" @click="tab(0)">文章</view>
				<view class="follow-tab__item" :class="{active:activeIndex === 1}" @click="tab(1)">作者</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list__swiper" :current="activeIndex" @change="change">
				<swiper-item>
					<list-srcoll>
						<uni-load-more v-if="list.length === 0 && !articleShow" iconType="snow" status="loading"></uni-load-more>
						<list-card v-for="item in list" :key="item._id" :item="item" types="follow"></list-card>
						<view v-if="articleShow" class="no-data">还没有数据哦~</view>
					</list-srcoll>
				</swiper-item>
				<swiper-item>
					<list-srcoll>
						<list-author v-for="item in authorLists" :key="item.id" :item="item"></list-author>
					</list-srcoll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex:0,
				list:[],
				articleShow:false,
				authorLists:[]
			}
		},
		onLoad() {
			uni.$on('update_article',()=>{
				console.log("页面刷新");
				this.getFollow()
			})
			uni.$on('update_author',()=>{
				this.getAuthor()
			})
			this.getFollow()
			this.getAuthor()
		},
		methods: {
			change(e){
				this.activeIndex = e.detail.current
			},
			tab(index){
				this.activeIndex = index
			},
			getFollow(){
				this.$api.get_follow().then(res=>{
					//console.log(res);
					const {data} = res
					this.list = data
					this.articleShow = this.list.length === 0?true:false
				})
			},
			getAuthor(){
				this.$api.get_author().then(res=>{
					console.log("作者关注",res);
					const {data} = res
					this.authorLists = data
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: felx;
	}
	
	.follow{
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;
		
		.follow-tab{
			height: 30px;
			padding: 10px 20px;
			border-bottom: 1px #f5f5f5 solid;
			
			.follow-tab__box{
				width: 100%;
				height: 100%;
				display: flex;
				border-radius: 5px;
				border: 1px $mk-base-color solid;
				
				.follow-tab__item{
					display: flex;
					justify-content: center;
					align-items: center;
					color: #666666;
					font-size: 14px;
					width: 100%;
					
					&:first-child{
						border-right: 1px $mk-base-color solid;
					}
					
					&.active{
						color: $mk-base-color;
					}
				}
			}
		}
		
		.follow-list{
			flex: 1;
			
			.follow-list__swiper{
				height: 100%;
				
				.swiper-item{
					height: 100%;
				}
			}
		}
	}
	
	.no-data{
		padding: 50px;
		font-size: 14px;
		color: #999999;
		text-align: center;
	}
</style>
