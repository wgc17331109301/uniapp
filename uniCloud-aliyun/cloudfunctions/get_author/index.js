'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	const {
		user_id
	} = event
	
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	
	const list = await db.collection('user')
		.aggregate()
		//添加字段
		.addFields({
			is_like:$.in(['$id',userinfo.author_likes_ids])
		})
		.match({
			is_like:true
		})
		.end()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:list.data
	}
};
