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
})
.then(function(myPost) {
	//console.log('request succeeded', myPost);
})
.then(function(error) {
	//console.log('request failed', error);
});

//В консоль выводится и саксес, и фейл - задать вопрос

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
var correctComments = [];

fetch(LUCKY_POST).then(function(res) {
	return res.json();
})
.then(function(post) {
	return Promise.all(post.comments.map(function(p) {
		return p;
	}))
})
.then(function(comments){
	return Promise.all(comments.map(function(u, i, arr) {
		fetch(BASE_PATH + '/users/' + u.user)
		.then(function(user) {
			return user.json();
		})
		.then(function(p){
			u.user = p.name;
			correctComments.push(u);
			console.log('u',u);
			$('.content-comments').append(u.user + ': ' + u.text + '; ');
			//Хотел вернуть массив, но не разобрался как. Поэтому сделал аппенд прямо тут
			//return u;
		})
	}))
	//return correctComments;
})
/*.then(function(correct){
	console.log('correctComments::::',correct);
	var correctCommentsString = '';
	correct.forEach(function(el) {
		console.log('el', el);
		correctCommentsString += (el.user + ': ' + el.text + '; ');
	});
	console.log('correctCommentsString', correctCommentsString);
})*/

