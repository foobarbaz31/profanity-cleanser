'use strict';

var fs = require('fs');
module.exports={

    getSupportedLocales: function(){

        var locales = require('naughty-words');
        var validLocales = Object.keys(locales);
        return validLocales;
    },
};
