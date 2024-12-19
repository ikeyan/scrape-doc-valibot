endsWith
--------

Creates an ends with validation action.

    const Action = v.endsWith<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends string`
*   `TMessage` `extends ErrorMessage<EndsWithIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `endsWith` you can validate the end of a string. If the end does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `EndsWithAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `endsWith` can be used.

#### Email schema

Schema to validate an email with a specific domain.

    const EmailSchema = v.pipe(v.string(), v.email(), v.endsWith('@example.com'));
    

### Related

The following APIs can be combined with `endsWith`.

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