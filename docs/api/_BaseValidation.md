BaseValidation
--------------

Base action type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `BaseValidation`
    *   `kind` `'validation'`
    *   `type` `string`
    *   `reference` `(...args: any[]) => BaseValidation<any, any, BaseIssue<unknown>>`
    *   `expects` `string | null`
    *   `async` `false`
    *   `~types` `{ input: TInput, output: TOutput, issue: TIssue } | undefined`
    *   `~validate` `(dataset: OutputDataset<TInput, BaseIssue<unknown>>, config: Config<TIssue>) => OutputDataset<TOutput, BaseIssue<unknown> | TIssue>`