var assert = require('chai').assert;
var meta = require('../../../lib/metadata.js');

describe('#getSupportedLocales test', function(){

    it('Should return a list of valid locales', function(){

        var validLocales = meta.getSupportedLocales();
        assert.include(validLocales, 'en', 'Verified that valid locales are obtained correctly');
    });
});
