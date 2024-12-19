excludes
--------

Creates an excludes validation action.

    const Action = v.excludes<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ContentInput`
*   `TRequirement` `extends ContentRequirement<ContentInput>`
*   `TMessage` `extends ErrorMessage<ExcludesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `excludes` you can validate the content of a string or array. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `ExcludesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `excludes` can be used.

#### String schema

Schema to validate that a string does not contain a specific substring.

    const StringSchema = v.pipe(
      v.string(),
      v.excludes('foo', 'The string must not contain "foo".')
    );
    

#### Array schema

Schema to validate that an array does not contain a specific string.

    const ArraySchema = v.pipe(
      v.array(v.string()),
      v.excludes('foo', 'The array must not contain "foo".')
    );
    

### Related

The following APIs can be combined with `excludes`.

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