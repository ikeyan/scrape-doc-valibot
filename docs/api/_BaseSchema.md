BaseSchema
----------

Base schema type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `BaseSchema`
    *   `kind` `'schema'`
    *   `type` `string`
    *   `reference` `(...args: any[]) => BaseSchema<unknown, unknown, BaseIssue<unknown>>`
    *   `expects` `string`
    *   `async` `false`
    *   `~standard` `1`
    *   `~vendor` `'valibot'`
    *   `~types` `{ input: TInput, output: TOutput, issue: TIssue } | undefined`
    *   `~validate` `(dataset: UnknownDataset, config?: Config<BaseIssue<unknown>>) => OutputDataset<TOutput, TIssue>`