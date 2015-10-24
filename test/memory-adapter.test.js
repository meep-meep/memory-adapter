var expect = require('expect.js');
var mockery = require('mockery');
var MemoryAdapter;
var memoryAdapter;

var actions;


describe('memory-adapter', function() {
    before(function() {
        mockery.enable({useCleanCache: true});
        mockery.registerAllowable('../src/index');
        mockery.registerAllowable('rsvp');
        MemoryAdapter = require('../src/index');
        memoryAdapter = new MemoryAdapter();
    });

    after(function() {
        mockery.disable();
    });

    describe('getKeys', function() {
        it('should not throw any error', function() {
            return memoryAdapter.getKeys()
                .then(function(keys) {
                    expect(keys).to.be.an(Array);
                });
        });
    });

    describe('get', function() {
        it('should throw any error when trying to read from a missing key', function(done) {
            return memoryAdapter.get('key')
                .catch(function() {
                    done();
                });
        });
    });

    describe('get/set', function() {
        it('should retrieve data that was previously set', function() {
            return memoryAdapter.set('key', 'value')
                .then(function() {
                    return memoryAdapter.get('key');
                })
                .then(function(value) {
                    expect(value).to.be('value');
                });
        });

        it('should retrieve data that was set last for a given key', function() {
            return memoryAdapter.set('key', 'value')
                .then(function() {
                    return memoryAdapter.set('key', 'apple');
                })
                .then(function() {
                    return memoryAdapter.get('key');
                })
                .then(function(value) {
                    expect(value).to.be('apple');
                });
        });
    });

    describe('writer/reader', function() {
        it('should read results that were previously written', function() {
            return memoryAdapter.writer('apple')
                .then(function() {
                    return memoryAdapter.writer('orange');
                })
                .then(function() {
                    return memoryAdapter.writer('peach');
                })
                .then(function() {
                    return memoryAdapter.reader();
                })
                .then(function(result) {
                    expect(result).to.eql(['apple', 'orange', 'peach']);
                });
        });
    });
});
