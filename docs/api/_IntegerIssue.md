IntegerIssue
------------

Integer issue type.

### Generics

*   `TInput` `extends number`

### Definition

*   `IntegerIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'integer'`
    *   `expected` `null`
    *   `received` `` `${number}` ``
    *   `requirement` `(input: number) => boolean`