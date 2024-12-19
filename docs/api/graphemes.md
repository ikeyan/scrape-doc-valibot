graphemes
---------

Creates a [graphemes](https://en.wikipedia.org/wiki/Grapheme) validation action.

    const Action = v.graphemes<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<GraphemesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `graphemes` you can validate the graphemes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `GraphemesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `graphemes` can be used.

#### Graphemes schema

Schema to validate a string with 8 graphemes.

    const GraphemesSchema = v.pipe(
      v.string(),
      v.graphemes(8, 'Exactly 8 graphemes are required.')
    );
    

### Related

The following APIs can be combined with `graphemes`.

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