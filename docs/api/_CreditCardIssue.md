CreditCardIssue
---------------

Credit card issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `CreditCardIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'credit_card'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `(input: string) => boolean`