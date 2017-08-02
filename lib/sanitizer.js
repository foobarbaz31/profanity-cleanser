'use strict';

var meta = require('./metadata.js');
module.exports= {

    sanitizeLocales: function(localeArray){

        var validLocales = meta.getSupportedLocales();
        var locale;
        if(typeof localeArray === 'string' || typeof localeArray === 'number')
        {
            throw "Input to locale should be an array. Eg. ['fr']";
        }
        if(localeArray === undefined)
        {
            locale = ['en']; // default locale is always english-base
        }
        else if(localeArray.length === 0)
        {
            locale = ['en'];
        }
        else
        {
            locale = localeArray;
        }

        // Check that these are valid locales
        locale.forEach(function(lang){
            if(validLocales.indexOf(lang) == -1)
            {
                throw "Invalid locale supplied to setLocale function. Please supply valid locales including : " + validLocales.toString();
            }
        });

        //All good return
        return locale;
    },

    sanitizeInputWordArray: function(inputWordArray){

        if(inputWordArray === undefined || typeof inputWordArray === 'string' || typeof inputWordArray === 'number')
        {
            throw "Input word array should be of a type array. Eg. ['a', 'man']";
        }
        return inputWordArray;
    },

    sanitizeReplacementPattern: function(input){

        var replacementPattern = input.replacementPattern;
        var replacementWord  = input.replacementWord;
        var validPatterns = input.validPatterns;

        var returnPat = {};
        if(replacementPattern === undefined)
        {
            returnPat.pattern = 'character';
            returnPat.word = '*';
            return returnPat;
        }

        if(validPatterns.indexOf(replacementPattern) == -1)
        {
            throw "Invalid replacement pattern passed. Please pass one of the following : " + validPatterns.toString();
        }

        if(replacementPattern === 'character' || replacementPattern === 'word')
        {
            if(replacementWord === undefined)
            {
                if(replacementPattern === 'character')
                {
                    returnPat.pattern = replacementPattern;
                    returnPat.word = '*';
                    return returnPat ;
                }
                if(replacementPattern === 'word')
                {
                    returnPat.pattern = replacementPattern;
                    returnPat.word = 'BLEEP';
                    return returnPat ;
                }
            }
        }

        returnPat.pattern = replacementPattern;
        returnPat.word = replacementWord;
        return returnPat ;
    },

};
