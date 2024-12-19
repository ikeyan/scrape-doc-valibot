ipv6
----

Creates an [IPv6](https://en.wikipedia.org/wiki/IPv6) address validation action.

    const Action = v.ipv6<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Ipv6Issue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `ipv6` you can validate the formatting of a string. If the input is not an IPv6 address, you can use `message` to customize the error message.

### Returns

*   `Action` `Ipv6Action<TInput, TMessage>`

### Examples

The following examples show how `ipv6` can be used.

#### IPv6 schema

Schema to validate an IPv6 address.

    const Ipv6Schema = v.pipe(
      v.string(),
      v.ipv6('The IP address is badly formatted.')
    );
    

### Related

The following APIs can be combined with `ipv6`.

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