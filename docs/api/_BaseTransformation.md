BaseTransformation
------------------

Base transformation type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `BaseTransformation`
    *   `kind` `'transformation'`
    *   `type` `string`
    *   `reference` `(...args: any[]) => BaseTransformation<any, any, BaseIssue<unknown>>`
    *   `async` `false`
    *   `~types` `{ input: TInput, output: TOutput, issue: TIssue } | undefined`
    *   `~validate` `(dataset: SuccessDataset<TInput>, config: Config<BaseIssue<unknown>>) => OutputDataset<TOutput, BaseIssue<unknown> | TIssue>`