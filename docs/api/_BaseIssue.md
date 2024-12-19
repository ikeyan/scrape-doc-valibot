BaseIssue
---------

Schema issue type.

### Generics

*   `TInput` `extends any`

### Definition

*   `BaseIssue` `extends Config<BaseIssue<TInput>>`
    *   `kind` `'schema' | 'validation' | 'transformation'`
    *   `type` `string`
    *   `input` `TInput`
    *   `expected` `string | null`
    *   `received` `string`
    *   `message` `string`
    *   `requirement` `unknown | undefined`
    *   `path` `[IssuePathItem, ...IssuePathItem[]] | undefined`
    *   `issues` `[BaseIssue<TInput>, ...BaseIssue<TInput>[]] | undefined`