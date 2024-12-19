RegexIssue
----------

Regex issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `RegexIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'regex'`
    *   `expected` `string`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`