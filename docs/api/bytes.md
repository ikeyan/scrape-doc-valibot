bytes
-----

Creates a [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

    const Action = v.bytes<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<BytesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `bytes` you can validate the bytes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `BytesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `bytes` can be used.

#### Bytes schema

Schema to validate a string with 8 bytes.

    const BytesSchema = v.pipe(
      v.string(),
      v.bytes(8, 'Exactly 8 bytes are required.')
    );
    

### Related

The following APIs can be combined with `bytes`.

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