//основная функциональность
//модель - объект, который хранит данные
//состоит из конструктора и прототипа
(function (global) {
    function Model() {
      //все данные будут хранится в attributes в формате ключ-значение
       this.attributes = {};
       //массив подписчиков на изменение модели 
       this.subscribers = [];
       this.init.apply(this, arguments);
    }

    Model.prototype = {
        //позволяет подписываться на модель. Это нужно для того, 
        //чтобы при изменении модели подписчики меняли view?
        subscribe: function(cb) {
            //когда подписываюсь на модель, подписчик добавляется в массив
            this.subscribers.push(cb); 
        },
        notify: function(cb) {
            //вызывает те функции, которые переданы при подписках?
            this.subscribers.forEach(function(cb) { 
                cb(this);
            }.bind(this));  //вызов функции с конексто bind, иначе функция будет вызвана с undefined
        },
        get: function(key) {
            return this.attributes[key];
        },
        set: function(key, value) {
            this.attributes[key] = value;
            this.notify();
        },
        init: function() {
            console.log('init');
        }
    }
    global.Model = Model;
    Model.subscribeAll = function(models, cb) {
        models.forEach(function(model) {
            model.subscribe(cb);
        });
    };
    //Фабрика
    Model.createModel = function(custom) {
       var child = function() {
           return Model.apply(this, arguments);
       }
       child.prototype = $.extend({}, Model.prototype, custom)
       return child;
    };

})(window);
