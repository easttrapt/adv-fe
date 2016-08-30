module.exports = function Resource(options) {
    var elem = $('<div></div>');

    //options.resource - undefined, options - объект
    //var resource = options.resource;
    var resource = options;

    // subscribe on resource
    console.log(options);
    resource.subscribe(function(cb){
        console.log('resource changed (resource/resource.js)');
        resource = options.resource;
    });

    function render() {
        elem.html(App.templates['resource']({}));
//        elem.find('.resource__name').html(resource.getName());
//        elem.find('.resource__val').html(resource.getCount());
          elem.find('.resource__name').html(resource.name);
          elem.find('.resource__val').html(resource.count);


        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
