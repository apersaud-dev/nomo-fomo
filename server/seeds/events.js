// import seed data files, arrays of objects
const eventsData = require('./../seed_data/events');

exports.seed = function(knex) {
  return knex('businesses')
    .del()
    .then(function () {
      return knex('businesses').insert(businessesData);
    })
    .then(() => {
      return knex('events').del();
    })
    .then(() => {
      return knex('events').insert(eventsData);
    })
};
