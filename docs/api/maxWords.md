maxWords
--------

Creates a max [words](https://en.wikipedia.org/wiki/Word) validation action.

    const Action = v.maxWords<TInput, TLocales, TRequirement, TMessage>(
      locales,
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxWordsIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `locales` `TLocales`
*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `maxWords` you can validate the words of a string based on the specified `locales`. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MaxWordsAction<TInput, TLocales, TRequirement, TMessage>`

### Examples

The following examples show how `maxWords` can be used.

#### Max words schema

Schema to validate a string with a maximum of 300 words.

    const MaxWordsSchema = v.pipe(
      v.string(),
      v.maxWords('en', 300, 'The string must not exceed 300 words.')
    );
    

### Related

The following APIs can be combined with `maxWords`.

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