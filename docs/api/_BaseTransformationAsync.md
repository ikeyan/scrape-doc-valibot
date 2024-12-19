BaseTransformationAsync
-----------------------

Base transformation async type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `BaseTransformationAsync` `extends Omit<BaseTransformation<TInput, TOutput, TIssue>, 'reference' | 'async' | '~validate'>`
    *   `reference` `((...args: any[]) => BaseTransformation<any, any, BaseIssue<unknown>> | BaseTransformationAsync<any, any, BaseIssue<unknown>>)`
    *   `async` `true`
    *   `~validate` `(dataset: SuccessDataset<TInput>, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput, BaseIssue<unknown> | TIssue>>`