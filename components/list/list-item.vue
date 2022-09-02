<template>
	<list-srcoll class="list-srcoll" @loadmore="loadmore">
		<view>
			<list-card :item="item" v-for="item in list" :key="item._id" mode="base"></list-card>
		</view>
		<uni-load-more v-if="list.length === 0 || list.length >7" iconType="snow" :status="load.loading || 'loading'"></uni-load-more>
	</list-srcoll>
</template>

<script>
	export default {
		props: {
			list:{
				type:Array,
				default(){
					return []
				}
			},
			load:{
				type:Object,
				default(){
					return {
						loading:"loading"
					}
				}
			}
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
			}
		}
	}
</script>

<style>
	.list-srcoll{
		height: 100%;
	}
</style>
