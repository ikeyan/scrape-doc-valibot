decimal
-------

Creates a [decimal](https://en.wikipedia.org/wiki/Decimal) validation action.

    const Action = v.decimal<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<DecimalIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `decimal` you can validate the formatting of a string. If the input is not a decimal, you can use `message` to customize the error message.

### Returns

*   `Action` `DecimalAction<TInput, TMessage>`

### Examples

The following examples show how `decimal` can be used.

#### Decimal schema

Schema to validate a decimal.

    const DecimalSchema = v.pipe(
      v.string(),
      v.decimal('The decimal is badly formatted.')
    );
    

### Related

The following APIs can be combined with `decimal`.

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