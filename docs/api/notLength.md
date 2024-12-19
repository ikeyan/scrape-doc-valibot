notLength
---------

Creates a not length validation action.

    const Action = v.notLength<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotLengthIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `notLength` you can validate the length of a string or array. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `NotLengthAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `notLength` can be used.

#### String schema

Schema to validate the length of a string.

    const StringSchema = v.pipe(
      v.string(),
      v.notLength(8, 'The string must not be 8 characters long.')
    );
    

#### Array schema

Schema to validate the length of an array.

    const ArraySchema = v.pipe(
      v.array(number()),
      v.notLength(10, 'The array must not contain 10 numbers.')
    );
    

### Related

The following APIs can be combined with `notLength`.

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