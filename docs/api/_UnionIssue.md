UnionIssue
----------

Union issue type.

### Generics

*   `TSubIssue` `extends BaseIssue<unknown>`

### Definition

*   `UnionIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'union'`
    *   `expected` `string`
    *   `issues` `[TSubIssue, ...TSubIssue[]]`