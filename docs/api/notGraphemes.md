notGraphemes
------------

Creates a not [graphemes](https://en.wikipedia.org/wiki/Grapheme) validation action.

    const Action = v.notGraphemes<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotGraphemesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `notGraphemes` you can validate the graphemes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `NotGraphemesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `notGraphemes` can be used.

#### Not graphemes schema

Schema to validate a string with more or less than 8 graphemes.

    const NotGraphemesSchema = v.pipe(
      v.string(),
      v.notGraphemes(8, 'The string must not have 8 graphemes.')
    );
    

### Related

The following APIs can be combined with `notGraphemes`.

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