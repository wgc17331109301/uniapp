'use strict';
const db = uniCloud.database()
//申明聚合操作符 
const $ = db.command.aggregate

exports.main = async (event, context) => {
	const {
		user_id,
		value,
	} = event
	
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userinfo.data[0].article_likes_ids
	
	//聚合
	const list = await db.collection('article')
		//获取数据库集合的聚合操作实例 
		.aggregate()
		//在列表里追加一个字段
		.addFields({
			is_like:$.in(['$_id',article_likes_ids])
		})
		//把指定的字段传递给下一个流水线，指定返回结果中记录需返回的字段
		.project({
			content:0
		})
		.match({
			title: new RegExp(value)
		})
		//标志聚合操作定义完成，发起实际聚合操作 
		.end()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:list.data
	}
};
