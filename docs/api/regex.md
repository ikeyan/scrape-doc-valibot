regex
-----

Creates a [regex](https://en.wikipedia.org/wiki/Regular_expression) validation action.

    const Action = v.regex<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<RegexIssue<TInput>> | undefined`

### Parameters

*   `requirement` `RegExp`
*   `message` `TMessage`

#### Explanation

With `regex` you can validate the formatting of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `RegexAction<TInput, TMessage>`

### Examples

The following examples show how `regex` can be used.

#### Pixel string schema

Schema to validate a pixel string.

    const PixelStringSchema = v.pipe(
      v.string(),
      v.regex(/^\d+px$/, 'The pixel string is badly formatted.')
    );
    

### Related

The following APIs can be combined with `regex`.

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