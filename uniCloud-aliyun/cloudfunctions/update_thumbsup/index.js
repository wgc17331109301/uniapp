'use strict';
const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event
	
	const user = await db.collection('user').doc(user_id).get()
	const thumbs_up_article_ids = user.data[0].thumbs_up_article_ids

	let thumbs_ids = null
	if(thumbs_up_article_ids.includes(article_id)){
		return{
			code:200,
			msg:'您已经点赞过了'
		}
	}else{
		thumbs_ids = dbCmd.addToSet(article_id)
	}

	//更新user表的数据
	await db.collection('user').doc(user_id).update({
		thumbs_up_article_ids : thumbs_ids
	})
	
	//增加点赞数
	await db.collection('article').doc(article_id).update({
		//原子操作   减少一次请求
		thumbs_up_count:dbCmd.inc(1)
	})
	
	
	//返回数据给客户端
	return {
		code:200,
		msg:'点赞成功'
	}
};
