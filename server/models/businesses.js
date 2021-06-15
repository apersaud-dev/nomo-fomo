const bookshelf = require('./../bookshelf');

const Business = bookshelf.model('Business', {
    tableName: 'businesses',
    // events: function () {
    //     return this.hasMany('Events');
    // },
});

module.exports = Business;