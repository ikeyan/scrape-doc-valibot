maxLength
---------

Creates a max length validation action.

    const Action = v.maxLength<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxLengthIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `maxLength` you can validate the length of a string or array. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MaxLengthAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `maxLength` can be used.

#### Maximum string length

Schema to validate a string with a maximum length of 32 characters.

    const MaxStringSchema = v.pipe(
      v.string(),
      v.maxLength(32, 'The string must not exceed 32 characters.')
    );
    

#### Maximum array length

Schema to validate an array with a maximum length of 5 items.

    const MaxArraySchema = v.pipe(
      v.array(v.number()),
      v.maxLength(5, 'The array must not exceed 5 numbers.')
    );
    

### Related

The following APIs can be combined with `maxLength`.

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