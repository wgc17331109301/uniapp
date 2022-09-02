<template>
	<view class="home">
		<navbar></navbar>
		<!-- 满足于components/组件名/组件名.vue -->
		<tab :list="tabLabel" :tabIndex="tabIndex" @tab="tab"></tab>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabLabel:[],
				tabIndex:0,
				activeIndex:0
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			tab({data,index}){
				this.activeIndex = index
			},
			getLabel(){
				uniCloud.callFunction({
					name:'get_label'
				}).then((res)=>{
					const {data} = res
					this.tabLabel = data
				})
			}
		}
	}
</script>

<style lang="scss">
	//这个页面的样式
	page {
		height: 100%;
		display: flex;
	}
	
	.home{
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		
		.home-list{
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
