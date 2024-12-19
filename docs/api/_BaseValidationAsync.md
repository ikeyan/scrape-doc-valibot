BaseValidationAsync
-------------------

Base validation async type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `BaseValidationAsync` `extends Omit<BaseValidation<TInput, TOutput, TIssue>, 'reference' | 'async' | '~validate'>`
    *   `reference` `((...args: any[]) => BaseValidation<any, any, BaseIssue<unknown>> | BaseValidationAsync<any, any, BaseIssue<unknown>>)`
    *   `async` `true`
    *   `~validate` `(dataset: OutputDataset<TInput, BaseIssue<unknown>>, config: Config<TIssue>) => Promise<OutputDataset<TOutput, BaseIssue<unknown> | TIssue>>`