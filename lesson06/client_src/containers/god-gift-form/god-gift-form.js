var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Resource  = require('models/resource.js');
var Hate = require('models/hate.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');

    var BASE_HATE = 50; // can be propogated from game
    var resources = options.resources;

    var hate = new Hate(BASE_HATE);

    var godHateIndicator = new GodHateIndicator({
        hate: hate 
    });

    // use it as map of gift impact 
    var godPrefer = {
        'gold': 6,
        'copper': 2,
        'wood': 1
    }

    // create tuner resources (resource model) tuneResource
    //
    //наверно это не правильно
    var tunnerResources = options.resources;


    // create gift components(gift-tuner) with tunerResouce 
    //
    // не понимаю, как создать тюнеры от tunnerResources
    var tunners = []; 

    // subscribe on tuner resouces 
    // onChange -> set changes in reseouce
    //
    resources.subscribe(function() {
        console.log('hate count changed');
        //почему нужно указывать что делать при изменении модели?
    });

    // subscribe on tunner resoures
    // onChange -> recalculate and set hate count
    //

    function render() {
        elem.html(App.templates['god-gift-form']({}));

            elem.find('.god-gift-form__tunners').html(tunners.map(function(tunner) {
                return tunner.render().elem;
            }));
            elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log(
                'send gift [' + 
                tunnerResources.map(function(resource) {
                    return resource.getName() + ':' + resource.getCount()
                }) +
                ']'
            );
        });
    }

    return {
        render: render,
        elem: elem
    }
};
