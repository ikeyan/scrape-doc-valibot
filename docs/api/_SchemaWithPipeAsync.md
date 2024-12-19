SchemaWithPipeAsync
-------------------

Schema with pipe async type.

### Generics

*   `TPipe` `extends [BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ...(PipeItem<any, unknown, BaseIssue<unknown>> | PipeItemAsync<any, unknown, BaseIssue<unknown>>)[]]`

### Definition

*   `SchemaWithPipeAsync` `extends Omit<FirstTupleItem<TPipe>, 'async' | '~types' | '~validate'>`
    *   `pipe` `TPipe`
    *   `async` `true`
    *   `~types` `{ input: InferInput<FirstTupleItem<TPipe>>, output: InferOutput<LastTupleItem<TPipe>>, issue: InferIssue<TPipe[number]> } | undefined`
    *   `~validate` `(dataset: UnknownDataset, config?: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferOutput<LastTupleItem<TPipe>>, InferIssue<TPipe[number]>>>`