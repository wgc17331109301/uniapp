'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
		page = 1,//当前页数
		pageSize = 10 //每页显示的条数
	} = event
	
	const list = await db.collection('article')
		.aggregate()
		.match({
			_id: article_id
		})
		.unwind('$comments')
		.project({
			_id:0,
			comments:1
		})
		.replaceRoot({
			newRoot:'$comments'
		})
		.skip(pageSize*(page-1))
		//限制输出到下一阶段的记录数。
		.limit(pageSize)
		.end()
		
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:list.data
	}
};
