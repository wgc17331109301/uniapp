<template>
	<view>
		<view class="comments-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item"></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 8" iconType="snow" :status="loading"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article_id:'',
				commentsList:[],
				page:1,//当前页数
				pageSize:8 ,//每页显示的条数
				loading:'loading'
			}
		},
		onLoad(query) {
			console.log("query是：",query);
			this.article_id = query.id
			this.getComments()
		},
		//页面上拉触底事件的处理函数 
		onReachBottom() {
			//console.log("触发上拉加载");
			if(this.loading === 'noMore') return
			this.page++
			this.getComments()
		},
		methods: {
			//请求评论内容
			getComments(){
				this.$api.get_comments({
					article_id:this.article_id,
					page:this.page,
					pageSize:this.pageSize
				}).then(res=>{
					console.log("评论的内容：",res);
					const {data} = res
					if(data.length === 0){
						this.loading = 'noMore'
						return
					}
					//对象复制
					let oldFormData = JSON.parse(JSON.stringify(this.commentsList))
					oldFormData.push(...data)
					this.commentsList = oldFormData
				})
			}
		}
	}
</script>

<style lang="scss">
	.comments-content{
		padding: 0 15px;
	}
</style>
