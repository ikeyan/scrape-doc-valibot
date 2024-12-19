creditCard
----------

Creates a [credit card](https://en.wikipedia.org/wiki/Payment_card_number) validation action.

    const Action = v.creditCard<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `ErrorMessage<CreditCardIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `creditCard` you can validate the formatting of a string. If the input is not a credit card, you can use `message` to customize the error message.

> The following credit card providers are currently supported: American Express, Diners Card, Discover, JCB, Union Pay, Master Card, and Visa.

### Returns

*   `Action` `CreditCardAction<TInput, TMessage>`

### Examples

The following examples show how `creditCard` can be used.

#### Credit Card schema

Schema to validate a credit card.

    const CreditCardSchema = v.pipe(
      v.string(),
      v.creditCard('The credit card is badly formatted.')
    );
    

### Related

The following APIs can be combined with `creditCard`.

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