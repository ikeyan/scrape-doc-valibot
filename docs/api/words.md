words
-----

Creates a [words](https://en.wikipedia.org/wiki/Word) validation action.

    const Action = v.words<TInput, TLocales, TRequirement, TMessage>(
      locales,
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<WordsIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `locales` `TLocales`
*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `words` you can validate the words of a string based on the specified `locales`. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `WordsAction<TInput, TLocales, TRequirement, TMessage>`

### Examples

The following examples show how `words` can be used.

#### Words schema

Schema to validate a string with 3 words.

    const WordsSchema = v.pipe(
      v.string(),
      v.words('en', 3, 'Exactly 3 words are required.')
    );
    

### Related

The following APIs can be combined with `words`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)