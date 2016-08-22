var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');

$('.content').append(new UserWealth().render().elem);
$('.content').append(new GodGiftForm().render().elem);
