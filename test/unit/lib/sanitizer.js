var assert = require('chai').assert;
var sanitizer = require('../../../lib/sanitizer.js');
var validPatterns = [];

describe('#sanitizeLocales test', function(){

    it('Should throw an error when invalid type of localeArray is passed as input', function(){
        assert.throws(function(){
            sanitizer.sanitizeLocales('muchwow')
        }, "Input to locale should be an array. Eg. ['fr']", 'Verified error is thrown');

        assert.throws(function(){
            sanitizer.sanitizeLocales(10)
        }, "Input to locale should be an array. Eg. ['fr']", 'Verified error is thrown');
    });

    it('Should default to locale en when no localeArray is passed as input', function(){
        var loc = sanitizer.sanitizeLocales();
        assert.deepEqual(loc, ['en'], 'Verified that without input locale defaults to en');
    });

    it('Should default to locale en when empty localeArray is passed as input', function(){
        var loc = sanitizer.sanitizeLocales([]);
        assert.deepEqual(loc, ['en'], 'Verified that with empty input locale defaults to en');
    });

    it('Should correct locales  when valid localeArray is passed as input', function(){
        var loc = sanitizer.sanitizeLocales(['fr', 'it']);
        assert.deepEqual(loc, ['fr', 'it'], 'Verified that with empty input locale defaults to en');
    });

    it('Should throw error if valid locales is passed in the array input', function(){

        assert.throws(function(){
            sanitizer.sanitizeLocales([100])
        }, "Invalid locale supplied to setLocale function. Please supply valid locales including", 'Verified error is thrown');
    });
});

describe('#sanitizeInputWordArray test', function(){

    it('Should an error if input word array is undefined', function(){
        assert.throws(function(){
            sanitizer.sanitizeInputWordArray()
        }, "Input word array should be of a type array. Eg. ['a', 'man']", 'Verified error is thrown');
    });

    it('Should an error if input word array is of invalid type - string', function(){
        assert.throws(function(){
            sanitizer.sanitizeInputWordArray('invalidWord')
        }, "Input word array should be of a type array. Eg. ['a', 'man']", 'Verified error is thrown');
    });

    it('Should an error if input word array is of invalid type - number', function(){
        assert.throws(function(){
            sanitizer.sanitizeInputWordArray(200)
        }, "Input word array should be of a type array. Eg. ['a', 'man']", 'Verified error is thrown');
    });

    it('Should return back the array if valid word array is passed', function(){
        var inputArr = ['badword', 'morebadwords'];
        var out = sanitizer.sanitizeInputWordArray(inputArr);
        assert.deepEqual(inputArr, out, 'Verified taht sanitizeInputWordArray returns correct data with valid input');
    });

    it('Should return back the array if empty word array is passed', function(){
        var inputArr = [];
        var out = sanitizer.sanitizeInputWordArray(inputArr);
        assert.deepEqual(inputArr, out, 'Verified taht sanitizeInputWordArray returns correct data with no input');
    });
});

describe('#sanitizeReplacementPattern test', function(){

    before(function(){
        validPatterns = ['character', 'grawlix', 'word'];
    });

    it('Should not throw an error when replacementPattern is word and correct replacementWord is passed', function(){

        var input = {};
        input.replacementPattern = 'word';
        input.replacementWord = 'BLEEP';
        input.validPatterns = validPatterns;
        assert.doesNotThrow(function(){
            sanitizer.sanitizeReplacementPattern(input)
        }, 'Error', 'Verified that with valid pattern of word and valid word BLEEP no error is thrown');

    });

    it('Should not throw an error when replacementPattern is character and correct replacementWord is passed', function(){

        var input = {};
        input.replacementPattern = 'character';
        input.replacementWord = '*';
        input.validPatterns = validPatterns;

        assert.doesNotThrow(function(){
            sanitizer.sanitizeReplacementPattern(input)
        }, 'Error', 'Verified that with valid pattern of word and valid word * no error is thrown');

    });

    it('Should not throw an error when replacementPattern is grawlix and no replacementWord is passed', function(){

        var input = {};
        input.replacementPattern = 'grawlix';
        input.replacementWord = '*';
        input.validPatterns = validPatterns;

        assert.doesNotThrow(function(){
            sanitizer.sanitizeReplacementPattern(input)
        }, 'Error', 'Verified that with valid pattern of grawlix and no word is passed no error is thrown');

    });

    it('Should throw an error when replacementPattern is incorrect', function(){

        var input = {};
        input.replacementPattern = 'muchwowr';
        input.replacementWord = 'BLEEP';
        input.validPatterns = validPatterns;

        assert.throws(function(){
            sanitizer.sanitizeReplacementPattern(input)
        }, 'Invalid replacement pattern passed. Please pass one of the following : ');

    });

    it('Should not throw an error when replacementPattern is grawlix and no replacementWord is passed', function(){

        var input = {};
        input.replacementPattern = 'grawlix';
        input.validPatterns = validPatterns;

        assert.doesNotThrow(function(){
            sanitizer.sanitizeReplacementPattern(input)
        }, 'For replacement patterns of character and word, replacement word is mandotory. Pleace pass a replacement word');

    });

    it('Should default to character and star when replacementPattern and word are not passed', function(){
        var input = {};
        input.replacementPattern;
        input.replacementWord;
        input.validPatterns = validPatterns;

        var ret = sanitizer.sanitizeReplacementPattern(input);
        assert.equal(ret.pattern, 'character', 'Verified that default pattern becomes character');
        assert.equal(ret.word, '*', 'Verified that default word becomes *');
    });

    it('Should default word to  star when replacementPattern is charachter and no word', function(){
        var input = {};
        input.replacementPattern = 'word';
        input.replacementWord;
        input.validPatterns = validPatterns;

        var ret = sanitizer.sanitizeReplacementPattern(input);
        assert.equal(ret.pattern, 'word', 'Verified that default pattern becomes character');
        assert.equal(ret.word, 'BLEEP', 'Verified that default word becomes *');
    });
});
