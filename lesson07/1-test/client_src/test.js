var BASE_PATH = '/json-server';
var BASE_POSTS = BASE_PATH + '/posts';
var LUCKY_POST = BASE_POSTS + '/466';

//1.1 Обновить количество лайков у поста 466
fetch(LUCKY_POST, {
	method: 'PATCH',
	headers: {
		'Content-Type': 'application/json'
	},
	body: '{"likeCount": 8}'
})
.then(function(res) {
	return res.json();
});

//1.2 Получить все посты и подсчитать сумму лайков всех постов
fetch(BASE_POSTS).then(function(res) {
	return res.json();
})
.then(function(posts) {
	var likesSum = 0;
	posts.forEach(function(p) {
		likesSum += p.likeCount;
	});
	$('.content-sum').html(likesSum);
})


//1.3 Получить комментарии к посту 466 и вывести.

fetch(LUCKY_POST).then(function(res) {
	return res.json();
})
.then(function(post) {
	return Promise.all(post.comments.map(function(comments) {
		return comments;
	}))
})
.then(function(comments){
	console.log('comments', comments);
	return Promise.all(comments.map(function(comment) {
		fetch(BASE_PATH + '/users/' + comment.user)
		.then(function(user) {
			return user.json();
		})
		.then(function(user){
			comment.user = user.name;
			console.log('u',comment);
			$('.content-comments').append(comment.user + ': ' + comment.text + '; ');
		})
	}))
})

