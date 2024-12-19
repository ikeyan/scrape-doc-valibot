multipleOf
----------

Creates a [multiple](https://en.wikipedia.org/wiki/Multiple_\$0mathematics\$0) of validation action.

    const Action = v.multipleOf<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends number`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MultipleOfIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `multipleOf` you can validate the value of a number. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MultipleOfAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `multipleOf` can be used.

#### Even number schema

Schema to validate an even number.

    const EvenNumberSchema = v.pipe(
      v.number(),
      v.multipleOf(2, 'The number must be even.')
    );
    

### Related

The following APIs can be combined with `multipleOf`.

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