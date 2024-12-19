ip
--

Creates an [IP address](https://en.wikipedia.org/wiki/IP_address) validation action.

> This validation action accepts IPv4 and IPv6 addresses. For a more specific validation, you can also use [`ipv4`](ipv4.md) or [`ipv6`](ipv6.md).

    const Action = v.ip<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IpIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `ip` you can validate the formatting of a string. If the input is not an IP address, you can use `message` to customize the error message.

### Returns

*   `Action` `IpAction<TInput, TMessage>`

### Examples

The following examples show how `ip` can be used.

#### IP address schema

Schema to validate an IP address.

    const IpAddressSchema = v.pipe(
      v.string(),
      v.ip('The IP address is badly formatted.')
    );
    

### Related

The following APIs can be combined with `ip`.

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