<template>
	<view class="scroll">
		<scroll-view class="list-scroll" scroll-y @scrolltolower="loadmore">
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"list_srcoll",
		data() {
			return {
				
			};
		},
		methods:{
			loadmore(){
				console.log('触发上拉事件');
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.scroll{
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		height: 100%;
		
		.list-scroll{
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
