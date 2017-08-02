# profanity-cleanser
[![Build Status](https://travis-ci.org/shwetasabne/profanity-cleanser.svg?branch=master)](https://travis-ci.org/shwetasabne/profanity-cleanser)

A simple node utility that removes/replaces profane words in given text. Very easily configurable wherein you can set the locale and replacement patterns of your choice.

## Locales supported

The module uses the profane words curated and maintained by [Shutterstock Project](https://github.com/shutterstock/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words).

*Default locale is en*

## Supported replacement patterns

| Replacement Pattern | Default replacement Word/Characters | Sample Output |
| --- | --- | --- |
| word | BLEEP | Your ass becomes Your BLEEP |
| character | * | Your ass becomes Your \*\*\* |
| grawlix | - | Your ass becomes You &!# |

*Default replacement pattern is 'star'*

## methods

*Warning : Examples may contain offensive text*

### cleanser.replace(inputString<string>, replacementPattern<string>, replacementWord<string>)

Replaces the bad words in the given inputString with the replacement pattern and replacement word passed to the function. For more usage examples please see ```javascript example.js```

#### Default replacement

```javascript
var cleanser = require('profanity-cleanser');

// Sets to default locale of en
cleanser.setLocale();

var inputString = "Your ass is shit"

// output becomes "You *** is ****"
var output = cleanser.replace(inputString);
```

#### Replacement with word of your choice

```javascript
var cleanser = require('profanity-cleanser');

// Sets to default locale of en
cleanser.setLocale();

var inputString = "Your ass is shit"

// output becomes "You FOOBAR is FOOBAR"
var output = cleanser.replace(inputString, 'word', 'FOOBAR');
```

#### Replacement with grawlix (i.e. random special characters)
```javascript
var cleanser = require('profanity-cleanser');

// Sets to default locale of en
cleanser.setLocale();

var inputString = "Your ass is shit"

// output becomes "You !#$ is &^!@"
var output = cleanser.replace(inputString, 'grawlix');
```

### cleanser.setLocale([string])

Validates and sets the locale for profanity check based on the array passed. Acceptable locales map to the one's supported ./seeds directory. Setting locale implies using the badwords in the corresponding ./seeds/<locale> file for profanity checking.

```javascript
var cleanser = require('profanity-cleanser');

// Sets to default locale of en
cleanser.setLocale();

// Sets the locale to hindi spanish and japanese.
cleanser.setLocale(['hi', 'es', 'ja']);
```

### cleanser.getLocale()

Returns the currenly set locales.

```javascript
var cleanser = require('profanity-cleanser');

//Set locale to hindi spanish and japanese
cleanser.setLocale(['hi', 'es', 'ja'])

var output = cleanser.getLocale();

// Outputs hi,es,ja
console.log(output.toString())
```

### cleanser.addWords([string])

This method allows you to add more words of your choice to the dictionary.

```javascript
var cleanser = require('profanity-cleanser');

cleanser.setLocale()

var output = cleanser.addWords(["foo", "bar"]);

var input = "Your ass foo is as shit as bar"

// Output : "Your *** *** is as **** as ***"
var output = cleanser.replace(input)
```

### cleanser.removeWords(string)

This method allows you to remove word from the dictionary.

```javascript
var cleanser = require('profanity-cleanser');

cleanser.setLocale()

var output = cleanser.removeWords("ass");

var input = "Your ass is shit"

// Output : "Your ass is as ****"
var output = cleanser.replace(input)
```

### cleanser.getDictionary()

This method returns a list of all the words currently in the profane words dictionary. Can be helpful in debugging.

```javascript
var cleanser = require('profanity-cleanser');

cleanser.setLocale()

var output = cleanser.getDictionary();
```

## References

- This node module is based on the [BanBuilder](http://banbuilder.com/)  module written for php.

- Also used @jwils0n's [profanity-filter](https://github.com/jwils0n/profanity-filter) as reference for grawlix implementation.

- Seed data for locale based bad words is obtained from [Shutterstock Project](https://github.com/shutterstock/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words).


