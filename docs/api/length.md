length
------

Creates a length validation action.

    const Action = v.length<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<LengthIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `length` you can validate the length of a string or array. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `LengthAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `length` can be used.

#### String schema

Schema to validate the length of a string.

    const StringSchema = v.pipe(
      v.string(),
      v.length(8, 'The string must be 8 characters long.')
    );
    

#### Array schema

Schema to validate the length of an array.

    const ArraySchema = v.pipe(
      v.array(v.number()),
      v.length(100, 'The array must contain 100 numbers.')
    );
    

### Related

The following APIs can be combined with `length`.

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