<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons size="20" color="#f07373" :type="like?'heart-filled':'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			types:{
				type:String,
				default:''
			},
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		name:"likes",
		data() {
			return {
				like:false
			};
		},
		watch:{
			item(newVal){
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods:{
			likeTap(){
				console.log('点击收藏');
				this.like = !this.like,
				this.setUpdateLike()
			},
			setUpdateLike(){
				//显示 loading 提示框 
				uni.showLoading({})
				this.$api.update_like({
					user_id:'616d628c618ecb0001b0644e',
					article_id:this.item._id
				}).then(res=>{
					//隐藏 loading 提示框 
					uni.hideLoading()
					//显示消息提示框 
					uni.showToast({
						title:this.like?'收藏成功':'取消收藏',
						icon:'none'
					})
					uni.$emit('update_article')
					//console.log(res);
				}).catch(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	.icons{
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
</style>
