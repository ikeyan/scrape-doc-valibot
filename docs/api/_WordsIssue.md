WordsIssue
----------

Words issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `WordsIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'words'`
    *   `expected` `` `${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`