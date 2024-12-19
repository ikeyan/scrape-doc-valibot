SafeIntegerIssue
----------------

Safe integer issue type.

### Generics

*   `TInput` `extends number`

### Definition

*   `SafeIntegerIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'safe_integer'`
    *   `expected` `null`
    *   `received` `` `${number}` ``
    *   `requirement` `(input: number) => boolean`