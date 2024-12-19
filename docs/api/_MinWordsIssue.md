MinWordsIssue
-------------

Min words issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `MinWordsIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'min_words'`
    *   `expected` `` `>=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`