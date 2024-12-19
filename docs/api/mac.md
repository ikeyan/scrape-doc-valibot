mac
---

Creates a [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

> This validation action accepts 48-bit and 64-bit MAC addresses. For a more specific validation, you can also use [`mac48`](mac48.md) or [`mac64`](mac64.md).

    const Action = v.mac<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<MacIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `mac` you can validate the formatting of a string. If the input is not a MAC address, you can use `message` to customize the error message.

### Returns

*   `Action` `MacAction<TInput, TMessage>`

### Examples

The following examples show how `mac` can be used.

#### MAC schema

Schema to validate a MAC address.

    const MacSchema = v.pipe(
      v.string(),
      v.mac('The MAC address is badly formatted.')
    );
    

### Related

The following APIs can be combined with `mac`.

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