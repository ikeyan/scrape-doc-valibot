mac48
-----

Creates a 48-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

    const Action = v.mac48<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Mac48Issue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `mac48` you can validate the formatting of a string. If the input is not a 48-bit MAC address, you can use `message` to customize the error message.

### Returns

*   `Action` `Mac48Action<TInput, TMessage>`

### Examples

The following examples show how `mac48` can be used.

#### 48-bit MAC schema

Schema to validate a 48-bit MAC address.

    const Mac48Schema = v.pipe(
      v.string(),
      v.mac48('The MAC address is badly formatted.')
    );
    

### Related

The following APIs can be combined with `mac48`.

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