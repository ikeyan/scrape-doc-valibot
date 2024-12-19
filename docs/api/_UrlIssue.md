UrlIssue
--------

URL issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `UrlIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'url'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `(input: string) => boolean`