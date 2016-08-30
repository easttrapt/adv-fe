var userResource = require('components/resource/resource.js');

module.exports = function UserWealth() {
    var elem = $('<div></div>');

    var userGold = new userResource({
    	name: 'Gold',
    	amount: 20
    });

	var userCopper = new userResource({
    	name: 'Copper',
    	amount: 30
    });

	var userWood = new userResource({
    	name: 'Wood',
    	amount: 30
    });

    function render() {
        elem.html(App.templates['user-wealth']({}));

        elem.find('.user-wealth__gold').html(userGold.render().elem);
        elem.find('.user-wealth__copper').html(userCopper.render().elem);
        elem.find('.user-wealth__wood').html(userWood.render().elem);

        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
