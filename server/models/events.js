const bookshelf = require('./../bookshelf');

const Events = bookshelf.model('Events', {
    tableName: 'events',
    business: function () {
        return this.belongsTo('Business');
    },
});

module.exports = Events;