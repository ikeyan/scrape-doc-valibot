NotWordsIssue
-------------

Not words issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `NotWordsIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'not_words'`
    *   `expected` `` `!${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`