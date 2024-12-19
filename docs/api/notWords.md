notWords
--------

Creates a not [words](https://en.wikipedia.org/wiki/Word) validation action.

    const Action = v.notWords<TInput, TLocales, TRequirement, TMessage>(
      locales,
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotWordsIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `locales` `TLocales`
*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `notWords` you can validate the words of a string based on the specified `locales`. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `NotWordsAction<TInput, TLocales, TRequirement, TMessage>`

### Examples

The following examples show how `notWords` can be used.

#### Not words schema

Schema to validate a string with more or less than 5 words.

    const NotWordsSchema = v.pipe(
      v.string(),
      v.notWords('en', 5, 'The string must not have 5 words.')
    );
    

### Related

The following APIs can be combined with `notWords`.

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