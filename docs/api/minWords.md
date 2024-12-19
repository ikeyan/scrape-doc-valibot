minWords
--------

Creates a min [words](https://en.wikipedia.org/wiki/Word) validation action.

    const Action = v.minWords<TInput, TLocales, TRequirement, TMessage>(
      locales,
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinWordsIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `locales` `TLocales`
*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `minWords` you can validate the words of a string based on the specified `locales`. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MinWordsAction<TInput, TLocales, TRequirement, TMessage>`

### Examples

The following examples show how `minWords` can be used.

#### Min words schema

Schema to validate a string with a minimum of 50 words.

    const MinWordsSchema = v.pipe(
      v.string(),
      v.minWords('en', 50, 'The string must contain at least 50 words.')
    );
    

### Related

The following APIs can be combined with `minWords`.

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