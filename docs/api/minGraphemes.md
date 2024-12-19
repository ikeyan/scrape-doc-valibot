minGraphemes
------------

Creates a min [graphemes](https://en.wikipedia.org/wiki/Grapheme) validation action.

    const Action = v.minGraphemes<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinGraphemesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `minGraphemes` you can validate the graphemes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MinGraphemesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `minGraphemes` can be used.

#### Min graphemes schema

Schema to validate a string with a minimum of 8 graphemes.

    const MinGraphemesSchema = v.pipe(
      v.string(),
      v.minGraphemes(8, 'The string must contain at least 8 graphemes.')
    );
    

### Related

The following APIs can be combined with `minGraphemes`.

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