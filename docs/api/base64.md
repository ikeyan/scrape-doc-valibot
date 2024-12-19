base64
------

Creates a [Base64](https://en.wikipedia.org/wiki/Base64) validation action.

    const Action = v.base64<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Base64Issue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `base64` you can validate the formatting of a string. If the input is not a Base64 string, you can use `message` to customize the error message.

### Returns

*   `Action` `Base64Action<TInput, TMessage>`

### Examples

The following examples show how `base64` can be used.

#### Base64 schema

Schema to validate a Base64 string.

    const Base64Schema = v.pipe(v.string(), v.base64('The data is badly encoded.'));
    

### Related

The following APIs can be combined with `base64`.

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