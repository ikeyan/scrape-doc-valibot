PipeAction
----------

Pipe action type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `PipeAction` `BaseValidation<TInput, TOutput, TIssue> | BaseTransformation<TInput, TOutput, TIssue> | BaseMetadata<TInput>`