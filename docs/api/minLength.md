minLength
---------

Creates a min length validation action.

    const Action = v.minLength<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinLengthIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `minLength` you can validate the length of a string or array. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MinLengthAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `minLength` can be used.

#### Minumum string length

Schema to validate a string with a minimum length of 3 characters.

    const MinStringSchema = v.pipe(
      v.string(),
      v.minLength(3, 'The string must be 3 or more characters long.')
    );
    

#### Minimum array length

Schema to validate an array with a minimum length of 5 items.

    const MinArraySchema = v.pipe(
      v.array(v.number()),
      v.minLength(5, 'The array must contain 5 numbers or more.')
    );
    

### Related

The following APIs can be combined with `minLength`.

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