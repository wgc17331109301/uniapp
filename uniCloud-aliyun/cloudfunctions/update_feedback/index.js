'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	const {
		user_id,//用户id
		feedbackImage = [],
		content = ''
	} = event
	
	await db.collection('feedback').add({
		user_id:user_id,
		feedbackImage:feedbackImage,
		content:content
	})
	//返回数据给客户端
	return {
		code:200,
		msg:"数据更新成功"
	}
};
