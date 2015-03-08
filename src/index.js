var RSVP = require('rsvp');



function MemoryAdapter() {
    this._data = {
        results: []
    };
}

MemoryAdapter.prototype = {
    getKeys: function getKeys() {
        return new RSVP.Promise(function(resolve, reject) {
            resolve(Object.keys(this._data));
        }.bind(this));
    },

    get: function get(key) {
        return new RSVP.Promise(function(resolve, reject) {
            resolve(this._data[key]);
        }.bind(this));
    },

    set: function set(key, value) {
        return new RSVP.Promise(function(resolve, reject) {
            this._data[key] = value;
            resolve(value);
        }.bind(this));
    },

    writer: function writer(qs) {
        return new RSVP.Promise(function(resolve, reject) {
            resolve(this._data.results.push(qs));
        }.bind(this));
    },

    reader: function reader() {
        return new RSVP.Promise(function(resolve, reject) {
            resolve(this._data.results);
        }.bind(this));
    }
};




module.exports = MemoryAdapter;
