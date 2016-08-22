module.exports = function Resource(options) {
    var elem = $('<div></div>');
    var name = options.name;
    var amount = options.amount;

    function render() {
        elem.html(App.templates['resource']({}));
        	elem.find('.resource__name').html(options.name);
        	elem.find('.resource__amount').html(options.amount);
        return this;
    }

    return {
        render: render,
        dec: function(){
        	amount -= 1;
            render();
        },
        inc: function(){
        	amount += 1;
            render();
        },
        getName: function(){
        	return name;
        },
		getAmount: function(){
        	return amount;
        },
        elem: elem
    }
};
