startsWith
----------

Creates a starts with validation action.

    const Action = v.startsWith<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends string`
*   `TMessage` `extends ErrorMessage<StartsWithIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `startsWith` you can validate the start of a string. If the start does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `StartsWithAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `startsWith` can be used.

#### HTTPS URL schema

Schema to validate a HTTPS URL.

    const HttpsUrlSchema = v.pipe(v.string(), v.url(), v.startsWith('https://'));
    

### Related

The following APIs can be combined with `startsWith`.

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