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
    // сделать ресурсы - как модели
    //форичем создать модели
    //функция пробегается по массиву и делает новые ресурсы
    //каунт при инициализации ноль
    var tunnerResources = resources.map(function(res){
        //var tunerRes = new Resource({
        return new Resource({
            count: 0,
            name: res.getName()
        });

        /*tunerRes.subscribe(function(cb){
            //логика, которая реагирует на изменение ресурсов
            console.log('tunerRes: ' + tunerRes);
            console.log('this: ' + this);
            //count = res.setCount(res.getCount())

            //перенес из сабскрайба ниже и закоментил
            hate = hate.setCount(hate.getCount - resource.getCount() * godPrefer[resource.getName()]);
        });

        //make gift-tuner
        var tunnerResource = new GiftTunner({
            resource: tunerRes,
            name: res.getName()
        });*/

        /*tunnerResource.subscribe(function(cb){
            //поменять хейт
            //использовать год префер
            //hate = hate.setCount(hate.getCount - resource.getCount() * godPrefer[resource.getName()]);
        })*/
    });

    var tunnerResource = tunnerResources.map(function(res){
        return new GiftTunner({
            resource: res,
            name: res.getName()
        });
    });

    //подпиался на изменения и меняю тюнер
    tunnerResources.forEach(function(tunner){
        tunner.subscribe(function(cb){
            //меняю ресурсы
            /*resources.forEach(function(res){
                console.log(res.getName() + ' : ' + res.getCount() + ' :: ' + tunner.getName() + ' : ' + tunner.getCount());
                if(res.getName() == tunner.getName()) {
                    res.setCount(res.getCount() - tunner.getCount());
                }
            });*/
            /*console.log('1: ' + resources[0].getCount());
            resources[0].setCount(50)
            console.log('2: ' + resources[0].getCount());*/
            //меняю хейтиндикатор
            hate.setCount(hate.getCount() - tunner.getCount() * godPrefer[tunner.getName()]);
        });
    });





    // create gift components(gift-tuner) with tunerResouce 
    //
/*

    // subscribe on tuner resouces 
    // onChange -> set changes in reseouce
    //
    resource.subscribe(function() {
        console.log('hate count changed');
        //почему нужно указывать что делать при изменении модели?
    });*/

    // subscribe on tunner resoures
    // onChange -> recalculate and set hate count
    //

    function render() {
        elem.html(App.templates['god-gift-form']({}));

            elem.find('.god-gift-form__tunners').html(tunnerResource.map(function(tunner) {
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
