uuid
----

Creates an [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) validation action.

    const Action = v.uuid<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<UuidIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `uuid` you can validate the formatting of a string. If the input is not an UUID, you can use `message` to customize the error message.

### Returns

*   `Action` `UuidAction<TInput, TMessage>`

### Examples

The following examples show how `uuid` can be used.

#### UUID schema

Schema to validate an UUID.

    const UuidSchema = v.pipe(v.string(), v.uuid('The UUID is badly formatted.'));
    

### Related

The following APIs can be combined with `uuid`.

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