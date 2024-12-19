MimeTypeIssue
-------------

Mime type issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` ``extends `${string}/${string}`[]``

### Definition

*   `MimeTypeIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'mime_type'`
    *   `expected` `string`
    *   `received` `` `"${string}"` ``
    *   `requirement` `TRequirement`