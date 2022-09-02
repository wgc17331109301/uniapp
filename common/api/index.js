//批量导出文件   自动导出
//找js文件
const requireApi = require.context(
	//api目录的相对路径
	'.',
	//是否查询子目录
	false,
	//查询文件的后缀
	/.js$/
)

let module = {}
requireApi.keys().forEach((key,index)=>{
	if(key === './index.js') return
	//console.log(key);
	//对象合并
	Object.assign(module,requireApi(key))
})

//导出
export default module