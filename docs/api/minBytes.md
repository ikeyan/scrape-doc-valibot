minBytes
--------

Creates a min [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

    const Action = v.minBytes<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinBytesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `minBytes` you can validate the bytes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MinBytesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `minBytes` can be used.

#### Min bytes schema

Schema to validate a string with a minimum of 64 bytes.

    const MinBytesSchema = v.pipe(
      v.string(),
      v.minBytes(64, 'The string must contain at least 64 bytes.')
    );
    

### Related

The following APIs can be combined with `minBytes`.

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