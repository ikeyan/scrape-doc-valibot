empty
-----

Creates an empty validation action.

    const Action = v.empty<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends LengthInput`
*   `TMessage` `extends ErrorMessage<EmptyIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `empty` you can validate that a string or array is empty. If the input is not empty, you can use `message` to customize the error message.

### Returns

*   `Action` `EmptyAction<TInput, TMessage>`

### Examples

The following examples show how `empty` can be used.

#### String schema

Schema to validate that a string is empty.

    const StringSchema = v.pipe(v.string(), v.empty('The string must be empty.'));
    

#### Array schema

Schema to validate that an array is empty.

    const ArraySchema = v.pipe(
      v.array(v.number()),
      v.empty('The array must be empty.')
    );
    

### Related

The following APIs can be combined with `empty`.

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