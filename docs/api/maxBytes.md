maxBytes
--------

Creates a max [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

    const Action = v.maxBytes<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxBytesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `maxBytes` you can validate the bytes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MaxBytesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `maxBytes` can be used.

#### Max bytes schema

Schema to validate a string with a maximum of 64 bytes.

    const MaxBytesSchema = v.pipe(
      v.string(),
      v.maxBytes(64, 'The string must not exceed 64 bytes.')
    );
    

### Related

The following APIs can be combined with `maxBytes`.

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