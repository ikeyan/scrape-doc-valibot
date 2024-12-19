hexadecimal
-----------

Creates a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) validation action.

    const Action = v.hexadecimal<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<HexadecimalIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `hexadecimal` you can validate the formatting of a string. If the input is not a hexadecimal, you can use `message` to customize the error message.

### Returns

*   `Action` `HexadecimalAction<TInput, TMessage>`

### Examples

The following examples show how `hexadecimal` can be used.

#### Hexadecimal schema

Schema to validate a Hexadecimal string.

    const HexadecimalSchema = v.pipe(
      v.string(),
      v.hexadecimal('The hexadecimal is badly formatted.')
    );
    

### Related

The following APIs can be combined with `hexadecimal`.

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