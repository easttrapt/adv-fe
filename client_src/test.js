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
    /*Handlebars.registerHelper('table', function ( text, options ){
        return 'aaaa';
    });

    
    var descriptionsPost = $('#table-template').html();               --------------jok
    var tableTemplate = Handlebars.compile( descriptionsPost );       --------------jok
    
    var table = tableTemplate({
        test: 'test'
    });

    
    $('.posts-json').html(context);
    */

    Handlebars.registerHelper('table', function ( posts, options ){
        //для каждого элемента поста возвращает его описание
        var descriptionTr = posts.map(function(elem, index) {
            return options.fn({
                description: elem.description
            });
        }).join('');
        //создаю таблицу с результатом
        return '<table class="descriptions-table">' + descriptionTr + '</table>';
    });


    //register description
    Handlebars.registerHelper('description', function() {
        return new Handlebars.SafeString('<tr><td>' + this.description + '</td></tr>');
    });


    var descriptionsPost = $('#table-template').html();
    var tableTemplate = Handlebars.compile( descriptionsPost );

    var table = tableTemplate({
        posts: posts
    });

    $('.posts-table').html(table);
});