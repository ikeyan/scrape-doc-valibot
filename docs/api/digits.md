digits
------

Creates a [digits](https://en.wikipedia.org/wiki/Numerical_digit) validation action.

    const Action = v.digits<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<DigitsIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `digits` you can validate the formatting of a string. If the input does not soley consist of numerical digits, you can use `message` to customize the error message.

### Returns

*   `Action` `DigitsAction<TInput, TMessage>`

### Examples

The following examples show how `digits` can be used.

#### Digits schema

Schema to validate a digits.

    const DigitsSchema = v.pipe(
      v.string(),
      v.digits('The string contains something other than digits.')
    );
    

### Related

The following APIs can be combined with `digits`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)