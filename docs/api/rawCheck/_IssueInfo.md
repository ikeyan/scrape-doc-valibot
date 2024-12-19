IssueInfo
---------

Issue info type.

### Generics

*   `TInput` `extends any`

### Definition

*   `IssueInfo`
    *   `label` `string | undefined`
    *   `input` `unknown | undefined`
    *   `expected` `string | undefined`
    *   `received` `string | undefined`
    *   `message` `ErrorMessage<RawCheckIssue<TInput>> | undefined`
    *   `path` `[IssuePathItem, ...IssuePathItem[]] | undefined`