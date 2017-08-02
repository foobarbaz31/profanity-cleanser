var assert = require('chai').assert;
var filter = require('../../filter.js');

describe('#replace test', function(){

    it('Should throw an error when setLocale is not called', function(){
        assert.throws(function(){filter.replace('this is ass')}, "Dictionary is not populated. Perhaps you forgot to call setLocale ?")
    });

    it('Should replace bad words with stars when no replacement patterns and words are given', function(){
        filter.setLocale();
        var dict = filter.getDictionary();
        var inputString = 'This is a bad string my ass. Also this string contains dick and vagina and bastard. But this is just a test. Do not mind fuck';
        var gotOutput = filter.replace(inputString);
        var expectedOutput = 'This is a bad string my ***. Also this string contains **** and ****** and *******. But this is just a test. Do not mind ****'
        assert.equal(gotOutput, expectedOutput, 'Verified that obtained output matches expected one')
    });

    it('Should replace bad words with the provided word given replacement pattern is word', function(){
        filter.setLocale();
        var dict = filter.getDictionary();
        var inputString = 'This is a bad string my ass. Also this string contains dick and vagina and bastard. But this is just a test. Do not mind fuck';
        var gotOutput = filter.replace(inputString, 'word', 'FOO');
        var expectedOutput = 'This is a bad string my FOO. Also this string contains FOO and FOO and FOO. But this is just a test. Do not mind FOO';
        assert.equal(gotOutput, expectedOutput, 'Verified that obtained output matches expected one')
    });

    it('Should replace bad words with grawlix given replacement pattern is grawlix', function(){
        filter.setLocale();
        var dict = filter.getDictionary();
        var inputString = 'This is a bad string my ass. Also this string contains dick and vagina and bastard. But this is just a test. Do not mind fuck';
        var gotOutput = filter.replace(inputString, 'grawlix');
        assert.include(gotOutput, '&', 'Verified that obtained output matches expected one')
    });

    it('Should replace bad words with BLEEP when replacement patterns is word but replacement word is not given', function(){
        filter.setLocale();
        var dict = filter.getDictionary();
        var inputString = 'This is a bad string my ass. Also this string contains dick and vagina and bastard. But this is just a test. Do not mind fuck';
        var gotOutput = filter.replace(inputString, 'word');
        var expectedOutput = 'This is a bad string my BLEEP. Also this string contains BLEEP and BLEEP and BLEEP. But this is just a test. Do not mind BLEEP';
        assert.equal(gotOutput, expectedOutput, 'Verified that obtained output matches expected one')
    });

    it('Should ignore the replacement word if the replacement pattern is grawlix', function(){
        filter.setLocale();
        var dict = filter.getDictionary();
        var inputString = 'This is a bad string my ass. Also this string contains dick and vagina and bastard. But this is just a test. Do not mind fuck';
        var gotOutput = filter.replace(inputString, 'grawlix', '***');
        assert.include(gotOutput, '&', 'Verified that obtained output matches expected one')
    });

    it('Should replace bad words with given characters when replacement pattern is character', function(){
        filter.setLocale();
        var dict = filter.getDictionary();
        var inputString = 'This is a bad string my ass. Also this string contains dick and vagina and bastard. But this is just a test. Do not mind fuck';
        var gotOutput = filter.replace(inputString, 'character', ';');
        var expectedOutput = 'This is a bad string my ;;;. Also this string contains ;;;; and ;;;;;; and ;;;;;;;. But this is just a test. Do not mind ;;;;'
        assert.equal(gotOutput, expectedOutput, 'Verified that obtained output matches expected one')
    });

    it('Should replace bad words with given characters when replacement pattern is character when no matter what the character is', function(){
        filter.setLocale();
        var dict = filter.getDictionary();
        var inputString = 'This is a bad string my ass. Also this string contains dick and vagina and bastard. But this is just a test. Do not mind fuck';
        var gotOutput = filter.replace(inputString, 'character', '#@');
        var expectedOutput = 'This is a bad string my #@#@#@. Also this string contains #@#@#@#@ and #@#@#@#@#@#@ and #@#@#@#@#@#@#@. But this is just a test. Do not mind #@#@#@#@'
        assert.equal(gotOutput, expectedOutput, 'Verified that obtained output matches expected one')
    });

    it('Should replace bad words if we can add words and give it an array of words', function(){
        filter.setLocale();
        filter.addWords(["username", "password"]);
        var inputString = 'This is a bad string my ass. My username is badword and password is goodword. Also this string contains dick and vagina and bastard. But this is just a test. Do not mind fuck';
        var expectedOutput = 'This is a bad string my ***. My ******** is badword and ******** is goodword. Also this string contains **** and ****** and *******. But this is just a test. Do not mind ****';
        var gotOutput = filter.replace(inputString);
        assert.equal(gotOutput, expectedOutput, 'Verified that obtained output matches expected one')
    });

    it('Should not replace bad words if we can remove word', function(){
        filter.setLocale();
        filter.removeWords("ass");
        var inputString = 'This is a bad string my ass. Also this string contains dick and vagina and bastard. But this is just a test. Do not mind fuck';
        var gotOutput = filter.replace(inputString);
        var expectedOutput = 'This is a bad string my ass. Also this string contains **** and ****** and *******. But this is just a test. Do not mind ****'
        assert.equal(gotOutput, expectedOutput, 'Verified that obtained output matches expected one')
    });

    it('Should replace only whole word occurance of bad word and not partial occurance', function(){

        filter.setLocale();
        var inputString = 'This is an assimilation borg, my ass!';
        var gotOutput = filter.replace(inputString);
        var expectedOutput = 'This is an assimilation borg, my ***!';
        assert.equal(gotOutput, expectedOutput, 'Verified that obtained output matches expected one')
    });

    it('Should replace all the bad words if given bad word occurs more than once in the string', function(){

        filter.setLocale();
        var inputString = 'This is an assimilation borg, my ass! String also contains vagina,ass,parrot. Will you replace ass, gas ? But not ass123';
        var gotOutput = filter.replace(inputString, 'word', 'BOOBOO');
        var expectedOutput = 'This is an assimilation borg, my BOOBOO! String also contains BOOBOO,BOOBOO,parrot. Will you replace BOOBOO, gas ? But not ass123';
         assert.equal(gotOutput, expectedOutput, 'Verified that obtained output matches expected one')

    });
});
