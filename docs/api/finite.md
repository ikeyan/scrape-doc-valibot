finite
------

Creates a [finite](https://en.wikipedia.org/wiki/Finite) validation action.

    const Action = v.finite<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends number`
*   `TMessage` `extends ErrorMessage<FiniteIssue<TInput>> | unknown`

### Parameters

*   `message` `TMessage`

#### Explanation

With `finite` you can validate the value of a number. If the input is not a finite number, you can use `message` to customize the error message.

### Returns

*   `Action` `FiniteAction<TInput, TMessage>`

### Examples

The following examples show how `finite` can be used.

#### Finite number schema

Schema to validate a finite number.

    const FiniteNumberSchema = v.pipe(
      v.number(),
      v.finite('The number must be finite.')
    );
    

### Related

The following APIs can be combined with `finite`.

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