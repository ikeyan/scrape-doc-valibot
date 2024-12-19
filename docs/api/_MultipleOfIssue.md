MultipleOfIssue
---------------

Multiple of issue type.

### Generics

*   `TInput` `extends number`
*   `TRequirement` `extends number`

### Definition

*   `MultipleOfIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'multiple_of'`
    *   `expected` `null`
    *   `received` `` `%${TRequirement}` ``
    *   `requirement` `(input: number) => boolean`