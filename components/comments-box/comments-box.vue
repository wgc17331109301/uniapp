<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header__logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comments-header__info">
				<view class="title">{{comments.author.author_name}}</view>
				<view>{{comments.create_time}}</view>
			</view>
		</view>
		<view class="comments-content">
			<view>{{comments.comment_content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			comments:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		name:"comments-box",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.comments-box{
		margin: 15px 0;
		
		.comments-header{
			display: flex;
			
			.comments-header__logo{
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				overflow: hidden;
				
				image{
					width: 100%;
					height: 100%;
				}
			}
			
			.comments-header__info{
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;
				
				.title{
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;
				}
			}
		}
		
		.comments-content{
			margin-top: 10px;
			font-size: 14px;
			color: #000;
		}
	}
</style>
