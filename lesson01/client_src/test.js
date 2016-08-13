$( document ).ready( function () {
    var posts = Data.getPosts();

    //handlesbars

    Handlebars.registerHelper('json', function(posts) {
        json = JSON.stringify(Data.getPosts(),"",4);
        return new Handlebars.SafeString('<pre>' + Handlebars.Utils.escapeExpression(json) + '</pre>');
    }); 

    var jsonPost = $('#template').html();
    var template = Handlebars.compile( jsonPost );

    var html = template({
        posts: Data.getPosts()
    });

    $('.posts-json').html(html);

    /*---------part two--------*/

    Handlebars.registerHelper('table', function ( posts, options ){
        return posts.map(function(elem, index) {
            return options.fn({
                description: elem.description,
                rowClass: index % 2 ? 'descriptionOdd' : 'descriptionEven'
            });
        }).join('');
    });

    var descriptionsPost = $('#table-template').html();
    var tableTemplate = Handlebars.compile( descriptionsPost );

    var table = tableTemplate({
        posts: posts
    });

    $('.posts-table').html(table);
});