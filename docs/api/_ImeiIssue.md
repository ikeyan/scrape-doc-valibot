ImeiIssue
---------

IMEI issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `ImeiIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'imei'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `(input: string) => boolean`