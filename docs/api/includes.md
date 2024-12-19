includes
--------

Creates an includes validation action.

    const Action = v.includes<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ContentInput`
*   `TRequirement` `extends ContentRequirement<ContentInput>`
*   `TMessage` `extends ErrorMessage<IncludesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `includes` you can validate the content of a string or array. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `IncludesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `includes` can be used.

#### String schema

Schema to validate that a string contains a specific substring.

    const StringSchema = v.pipe(
      v.string(),
      v.includes('foo', 'The string must contain "foo".')
    );
    

#### Array schema

Schema to validate that an array contains a specific string.

    const ArraySchema = v.pipe(
      v.array(v.string()),
      v.includes('foo', 'The array must contain "foo".')
    );
    

### Related

The following APIs can be combined with `includes`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`string`](string.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)