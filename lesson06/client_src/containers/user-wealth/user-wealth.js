var Resource = require('components/resource/resource.js');

module.exports = function UserWealth(options) {
    var elem = $('<div></div>');

    //получил массив ресурсов?
    var resources = options.resources; 

    // create resouce components 
    // {resouce: resouce}
    //

    var ctResources = resources.map(function(res){
        return new Resource({
            name: res.getName(),
            count: res.getCount()
        })
    });

    function render() {
        elem.html(App.templates['user-wealth']({}));
            elem.find('.user-wealth__resources').html(ctResources.map(function(r) {
                return r.render().elem;
            }));
        return this;

    }

    return {
        render: render,
        elem: elem
    }
};
