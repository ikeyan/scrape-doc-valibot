ulid
----

Creates an [ULID](https://github.com/ulid/spec) validation action.

    const Action = v.ulid<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<UlidIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `ulid` you can validate the formatting of a string. If the input is not an ULID, you can use `message` to customize the error message.

### Returns

*   `Action` `UlidAction<TInput, TMessage>`

### Examples

The following examples show how `ulid` can be used.

#### ULID schema

Schema to validate an ULID.

    const UlidSchema = v.pipe(v.string(), v.ulid('The ULID is badly formatted.'));
    

### Related

The following APIs can be combined with `ulid`.

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