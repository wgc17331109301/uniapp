'use strict';
const db = uniCloud.database()
//申明聚合操作符 
const $ = db.command.aggregate

exports.main = async (event, context) => {
	const {
		user_id,
		name,
		page = 1,
		pageSize = 10
	} = event
	
	let matchObj = {}
	if(name !== '全部'){
		matchObj = {
			classify : name
		}
	}
	
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
		//根据条件过滤文档，并且把符合条件的文档传递给下一个流水线阶段。
		.match(matchObj)
		//把指定的字段传递给下一个流水线，指定返回结果中记录需返回的字段
		.project({
			content:0
		})
		//指定一个正整数，跳过对应数量的文档，输出剩下的文档。 
		.skip(pageSize*(page-1))
		//限制输出到下一阶段的记录数。
		.limit(pageSize)
		//标志聚合操作定义完成，发起实际聚合操作 
		.end()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:list.data
	}
};
