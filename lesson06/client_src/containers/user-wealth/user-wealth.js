var Resource = require('components/resource/resource.js');

module.exports = function UserWealth(options) {
    var elem = $('<div></div>');

    //получил массив ресурсов?
    var resources = options.resources; 
    console.log('user-wealth: resources ' + resources);
    // create resouce components 
    // {resouce: resouce}
    //
    //наверно это не правильно
    var ctResources = options.resources;

    function render() {
/*        elem.html(App.templates['user-wealth']({}));
            elem.find('.user-wealth__resources').html(ctResources.map(function(r) {
                return r.render().elem;
            }));
        return this;
*/
    }

    return {
        render: render,
        elem: elem
    }
};
