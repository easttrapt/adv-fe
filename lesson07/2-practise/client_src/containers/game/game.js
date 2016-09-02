var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');
var Resource = require('models/resource.js');

module.exports = function Game(options) {
    var elem = $('<div></div>');

    function render() {

        BASE_RESOURCES = '/json-server/wealth/';
        fetch(BASE_RESOURCES).then(function(res){
            return res.json();
        })
        .then(function(r){
            console.log('r.resources', r.resources);
            //return r.resouces;
            var resources = r.resources.map(function(r) {
                return new Resource({
                    name: r.name,
                    count: r.count
                });
            });

            // create GodGiftForm 
            // {resources: resources}
            //
            var giftForm = new GodGiftForm({
                resources: resources
            });
            
            // create UserWealth 
            // {resources: resources}
            //
            var userWealth = new UserWealth({
                resources: resources
            });


            elem.html(App.templates['game']({}));
            elem.find('.game__god-gift-form').html(giftForm.render().elem);
            elem.find('.game__wealth').html(userWealth.render().elem);

        });
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
