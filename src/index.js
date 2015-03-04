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
        this._data.results.push(qs);
    },

    reader: function reader() {
        return this._data.results;
    }
};




module.exports = MemoryAdapter;
