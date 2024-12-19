nonEmpty
--------

Creates a non-empty validation action.

    const Action = v.nonEmpty<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends LengthInput`
*   `TMessage` `extends ErrorMessage<NonEmptyIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `nonEmpty` you can validate that a string or array is non-empty. If the input is empty, you can use `message` to customize the error message.

### Returns

*   `Action` `NonEmptyAction<TInput, TMessage>`

### Examples

The following examples show how `nonEmpty` can be used.

#### String schema

Schema to validate that a string is non-empty.

    const StringSchema = v.pipe(
      v.string(),
      v.nonEmpty('The string should contain at least one character.')
    );
    

#### Array schema

Schema to validate that an array is non-empty.

    const ArraySchema = v.pipe(
      v.array(v.number()),
      v.nonEmpty('The array should contain at least one item.')
    );
    

### Related

The following APIs can be combined with `nonEmpty`.

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