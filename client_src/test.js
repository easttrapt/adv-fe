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

    
    var descriptionsPost = $('#table-template').html();
    var tableTemplate = Handlebars.compile( descriptionsPost );
    
    var table = tableTemplate({
        test: 'test'
    });

    
    $('.posts-json').html(context);
    */
});