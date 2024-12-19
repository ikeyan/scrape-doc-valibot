hexColor
--------

Creates a [hex color](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) validation action.

    const Action = v.hexColor<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<HexColorIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `hexColor` you can validate the formatting of a string. If the input is not a hex color, you can use `message` to customize the error message.

### Returns

*   `Action` `HexColorAction<TInput, TMessage>`

### Examples

The following examples show how `hexColor` can be used.

#### Hex color schema

Schema to validate a hex color.

    const HexColorSchema = v.pipe(
      v.string(),
      v.hexColor('The hex color is badly formatted.')
    );
    

### Related

The following APIs can be combined with `hexColor`.

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