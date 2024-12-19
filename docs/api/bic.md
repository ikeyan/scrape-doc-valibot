bic
---

Creates a [BIC](https://en.wikipedia.org/wiki/ISO_9362) validation action.

    const Action = v.bic<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<BicIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `bic` you can validate the formatting of a string. If the input is not a BIC, you can use `message` to customize the error message.

### Returns

*   `Action` `BicAction<TInput, TMessage>`

### Examples

The following examples show how `bic` can be used.

#### BIC schema

Schema to validate a BIC.

    const BicSchema = v.pipe(
      v.string(),
      v.toUpperCase(),
      v.bic('The BIC is badly formatted.')
    );
    

### Related

The following APIs can be combined with `bic`.

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