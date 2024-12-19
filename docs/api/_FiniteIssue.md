FiniteIssue
-----------

Finite issue type.

### Generics

*   `TInput` `extends number`

### Definition

*   `FiniteIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'finite'`
    *   `expected` `null`
    *   `received` `` `${number}` ``
    *   `requirement` `(input: number) => boolean`