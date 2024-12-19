mac64
-----

Creates a 64-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

    const Action = v.mac64<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Mac64Issue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `mac64` you can validate the formatting of a string. If the input is not a 64-bit MAC address, you can use `message` to customize the error message.

### Returns

*   `Action` `Mac64Action<TInput, TMessage>`

### Examples

The following examples show how `mac64` can be used.

#### 64-bit MAC schema

Schema to validate a 64-bit MAC address.

    const Mac64Schema = v.pipe(
      v.string(),
      v.mac64('The MAC address is badly formatted.')
    );
    

### Related

The following APIs can be combined with `mac64`.

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