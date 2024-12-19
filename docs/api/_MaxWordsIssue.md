MaxWordsIssue
-------------

Max words issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `MaxWordsIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'max_words'`
    *   `expected` `` `<=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`