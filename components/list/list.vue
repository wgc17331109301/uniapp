<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
			<list-item :load="load[index]" :list="listCatchData[index]" @loadmore="loadmore"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		props:{
			tab:{
				type:Array,
				default(){
					return []
				}
			},
			activeIndex:{
				type:Number,
				default:0
			}
		},
		components:{
			listItem
		},
		name:"list",
		data() {
			return {
				list:[],
				listCatchData:{},
				load:{},
				pageSize:10
			};
		},
		watch:{
			tab(newVal){
				if(newVal.length === 0) return
				this.getList(this.activeIndex)
			}
		},
		created() {
			uni.$on('update_article',(e)=>{
				if(e === 'follow'){
					this.listCatchData = {}
					this.load = {}
					this.getList(this.activeIndex)
				}
			})
		},
		methods:{
			loadmore(){
				if(this.load[this.activeIndex].loading === 'noMore') return
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			change(e){
				const {current} = e.detail
				this.$emit('change',current)
				if(!this.listCatchData[current] || this.listCatchData[current].length === 0){
					this.getList(current)
				}
			},
			getList(current){
				if(!this.load[current]){
					this.load[current] = {
						page:1,
						loading:'loading'
					}
				}
				this.$api.get_list({
					name:this.tab[current].name,
					page:this.load[current].page,//当前第几页
					pageSize:this.pageSize//每页显示多少条数据
				}).then(res=>{
					//console.log(res);
					const {data} = res
					if(data.length === 0){
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load,current,oldLoad)
						//强制渲染页面
						this.$forceUpdate()
						return
					}
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					this.$set(this.listCatchData,current,oldList)
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper{
		height: 100%;
		
		.swiper-item{
			height: 100%;
			overflow: hidden;
			
			.list-srcoll{
				height: 100%;
			}
		}
	}
</style>
