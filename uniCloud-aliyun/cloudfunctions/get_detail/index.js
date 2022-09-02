'use strict';
const db = uniCloud.database()
//获取聚合操作符 
const $ = db.command.aggregate

exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event
	
	let user = await db.collection('user').doc(user_id).get()
	//获取user对象
	user = user.data[0]
	//获取文章的列表信息
	let list = await db.collection('article')
		.aggregate()
		.addFields({
			//是否关注作者
			is_author_like:$.in(['$author.id',user.author_likes_ids]),
			//是否收藏文章
			is_like:$.in(['$_id',user.article_likes_ids]),
			//是否点赞
			is_thumbs_up:$.in(['$_id',user.thumbs_up_article_ids])
		})
		.match({
			_id:article_id
		})
		.project({
			coments:0
		})
		.end()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:list.data[0]
	}
};
