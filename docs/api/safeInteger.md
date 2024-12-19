safeInteger
-----------

Creates a safe integer validation action.

    const Action = v.safeInteger<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends number`
*   `TMessage` `extends ErrorMessage<SafeIntegerIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `safeInteger` you can validate the value of a number. If the input is not a safe integer, you can use `message` to customize the error message.

### Returns

*   `Action` `SafeIntegerAction<TInput, TMessage>`

### Examples

The following examples show how `safeInteger` can be used.

#### Safe integer schema

Schema to validate an safe integer.

    const SafeIntegerSchema = v.pipe(
      v.number(),
      v.safeInteger('The number must be a safe integer.')
    );
    

### Related

The following APIs can be combined with `safeInteger`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`number`](number.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)