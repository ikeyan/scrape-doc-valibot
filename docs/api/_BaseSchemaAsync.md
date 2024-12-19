BaseSchemaAsync
---------------

Base schema async type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `BaseSchemaAsync` `extends Omit<BaseSchema<TInput, TOutput, TIssue>, 'reference' | 'async' | '~validate'>`
    *   `reference` `((...args: any[]) => BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>)`
    *   `async` `true`
    *   `~validate` `(dataset: UnknownDataset, config?: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput, TIssue>>`