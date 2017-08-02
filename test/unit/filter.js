var assert = require('chai').assert;
var filter = require('../../filter.js');

var en_words = require('naughty-words').en;
var fr_words = require('naughty-words').fr;
var it_words = require('naughty-words').it;

describe('#setLocale tests', function(){

    it('Should correctly set and populate en when no locale is passed', function(){
        assert.doesNotThrow(function(){filter.setLocale()}, 'Error', 'Verified setLocale does not throw error with empty params');
        filter.setLocale();
        var dict = filter.getDictionary();
        assert.equal(dict.length, en_words.length, 'Verified that without params setLocale inits dictionary as en')
    });

    it('Should correctly set and populate when a single locale is passed', function(){
        assert.doesNotThrow(function(){filter.setLocale(['fr'])}, 'Error', 'Verified setLocale does not throw error with empty params');
        filter.setLocale(['fr']);
        var dict = filter.getDictionary();
        assert.equal(dict.length, fr_words.length, 'Verified that with single element setLocale inits dictionary correctly');
    });

    it('Should correctly set and populate when multiple valid locales are passed', function(){
        assert.doesNotThrow(function(){filter.setLocale(['fr','it'])}, 'Error', 'Verified setLocale does not throw error with empty params');
        filter.setLocale(['fr', 'it']);
        var dict = filter.getDictionary();
        assert.equal(dict.length, fr_words.length + it_words.length, 'Verified that with multiple element setLocale inits dictionary correctly');
    });

    it('Should throw an error when invalid datatype input such as string is passed', function(){
        assert.throws(function(){filter.setLocale('frx')}, "Input to locale should be an array. Eg. ['fr']")
    });

    it('Should throw an error when invalid datatype input such as number is passed', function(){
        assert.throws(function(){filter.setLocale(10)}, "Input to locale should be an array. Eg. ['fr']")
    });

    it('Should throw an error when unsupported locale is passed', function(){
        assert.throws(function(){filter.setLocale(['fr', 'xoxo'])}, "Invalid locale supplied to setLocale function. Please supply valid locales including : ar,cs,da,de,en,eo,es,fa,fi,fr,fr-CA-u-sd-caqc,hi,hu,it,ja,ko,nl,no,pl,pt,ru,sv,th,tlh,tr,zh")
    });
});

describe('#showAvailableLocales tests', function(){

    it('Should not throw error when called', function(){

        assert.doesNotThrow(function(){
            filter.showAvailableLocales()
        }, 'Error', 'Verified that showAvailableLocales does not throw an error');
    });

    it('Should return array of supported locales', function(){
        var supportedLocales = filter.showAvailableLocales();
        assert.isAbove(supportedLocales.length, 0, 'Verified that showAvailableLocales returns a list of supported locales');
    });

});

describe('#getLocale tests', function(){

    it('Should return locale when a locale has been set', function(){
        filter.setLocale(['fr', 'fr-CA-u-sd-caqc']);
        var locales = filter.getLocale();
        assert.deepEqual(locales, ['fr', 'fr-CA-u-sd-caqc'], 'Verified that getLocales works as expected');
    });

    it('Should throw an error whe locale is not set', function(){

        assert.throws(function(){filter.setLocale(10)}, "Input to locale should be an array. Eg. ['fr']")
        assert.throws(function(){filter.getLocale()}, "It appears that locale is not set. Perhaps you forgot to call setLocale ?")
    });
});

describe('#getDictionary tests', function(){

    it('Should return an array of words currently loaded on dictionary', function(){
        assert.doesNotThrow(function(){filter.setLocale()}, 'Error', 'Verified setLocale does not throw error with empty params');
        filter.setLocale();
        var dict = filter.getDictionary();
        assert.equal(dict.length, en_words.length, 'Verified that without params setLocale inits dictionary as en')
    });

    it('Should return an empty array when setLocale does not set the dictionary', function(){

        assert.throws(function(){filter.setLocale(10)}, "Input to locale should be an array. Eg. ['fr']");
        var dict = filter.getDictionary();
        assert.equal(dict.length, 0, 'Verified that dictionary is empty when setLocale throws error or is not called correctly');
    });
});

describe('#addWords tests', function(){

    it('Should add word to the dictionary for valid input', function(){
        filter.setLocale();
        filter.addWords(["peaceandlovearenotbadwords", "sharingandcaringisawesome", "youonlyliveonce"]);
        var dict = filter.getDictionary();
        assert.include(dict, "peaceandlovearenotbadwords", 'Verified that newly added word one is in dictionary')
        assert.include(dict, "sharingandcaringisawesome", 'Verified that newly added word two is in dictionary')
        assert.include(dict, "youonlyliveonce", 'Verified that newly added word three is in dictionary')
    });

    it('Should do nothing when empty input array is passed', function(){

        filter.setLocale();
        var dict = filter.getDictionary();
        filter.addWords([]);
        var newDict = filter.getDictionary();
        assert.equal(dict.length, newDict.length, 'Verified that adding empty array does nothing');
    });

    it('Should throw an error for invalid inputs', function(){

        filter.setLocale();
        assert.throws(function(){filter.addWords(1)}, "Input word array should be of a type array. Eg. ['a', 'man']")
        assert.throws(function(){filter.addWords()}, "Input word array should be of a type array. Eg. ['a', 'man']")
        assert.throws(function(){filter.addWords("oho")}, "Input word array should be of a type array. Eg. ['a', 'man']")
    });
});

describe('#removeWords test', function(){

    it('Should remove word if it finds one from the dictionary', function(){
        filter.setLocale();
        filter.addWords(["itsawonderfullife"])
        var dict = filter.getDictionary();
        assert.include(dict, "itsawonderfullife", 'Verified that newly added word one is in dictionary')
        filter.removeWords("itsawonderfullife")
        dict = filter.getDictionary();
        assert.notInclude(dict, "itsawonderfullife", "Verified that the said word has been removed from dictionary")
    });

    it('Should do nothing to remove word if nothing is passed', function(){
        filter.setLocale();
        var oriDict = filter.getDictionary();
        assert.doesNotThrow(function(){filter.removeWords()}, 'Error', 'removeWords does nothing with no params are passed to it');
        var dict = filter.getDictionary();
        assert.equal(oriDict.length, dict.length, 'Verified the removeWords does nothing when no params are passed');
    });

    it('Should do nothing to remove word if it does not find one from the dictionary', function(){
        filter.setLocale();
        var oriDict = filter.getDictionary();
        assert.doesNotThrow(function(){filter.removeWords("jaimaharashtra")}, 'Error', 'removeWords does nothing with no params are passed to it');
        var dict = filter.getDictionary();
        assert.equal(oriDict.length, dict.length, 'Verified the removeWords does nothing when no params are passed');
    });

});

describe('#showReplacementPatterns', function(){

    it('Should sow replacement patterns', function(){
        var repPat = filter.showReplacementPatterns();
        assert.deepEqual(repPat, ['character', 'grawlix', 'word'], 'Verified that showReplacementPatterns works as expected');
    });
});

