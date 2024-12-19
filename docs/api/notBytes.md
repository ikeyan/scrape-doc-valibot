notBytes
--------

Creates a not [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

    const Action = v.notBytes<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotBytesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `notBytes` you can validate the bytes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `NotBytesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `notBytes` can be used.

#### Not bytes schema

Schema to validate a string with more or less than 8 bytes.

    const NotBytesSchema = v.pipe(
      v.string(),
      v.notBytes(8, 'The string must not have 8 bytes.')
    );
    

### Related

The following APIs can be combined with `notBytes`.

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