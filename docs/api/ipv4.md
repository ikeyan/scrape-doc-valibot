ipv4
----

Creates an [IPv4](https://en.wikipedia.org/wiki/IPv4) address validation action.

    const Action = v.ipv4<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Ipv4Issue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `ipv4` you can validate the formatting of a string. If the input is not an IPv4 address, you can use `message` to customize the error message.

### Returns

*   `Action` `Ipv4Action<TInput, TMessage>`

### Examples

The following examples show how `ipv4` can be used.

#### IPv4 schema

Schema to validate an IPv4 address.

    const Ipv4Schema = v.pipe(
      v.string(),
      v.ipv4('The IP address is badly formatted.')
    );
    

### Related

The following APIs can be combined with `ipv4`.

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