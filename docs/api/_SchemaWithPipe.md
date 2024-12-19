SchemaWithPipe
--------------

Schema with pipe type.

### Generics

*   `TPipe` `extends [BaseSchema<unknown, unknown, BaseIssue<unknown>>, ...PipeItem<any, unknown, BaseIssue<unknown>>[]]`

### Definition

*   `SchemaWithPipe` `extends Omit<FirstTupleItem<TPipe>, '~types' | '~validate'>`
    *   `pipe` `TPipe`
    *   `~types` `{ input: InferInput<FirstTupleItem<TPipe>>, output: InferOutput<LastTupleItem<TPipe>>, issue: InferIssue<TPipe[number]> } | undefined`
    *   `~validate` `(dataset: UnknownDataset, config?: Config<BaseIssue<unknown>>) => OutputDataset<InferOutput<LastTupleItem<TPipe>>, InferIssue<TPipe[number]>>`