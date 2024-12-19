Default
-------

Default type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TInput` `extends null | undefined`

### Definition

*   `Default` `MaybeReadonly<InferInput<TWrapped>, TInput> | ((dataset?: UnknownDataset, config?: Config<InferIssue<TWrapped>>) => MaybeReadonly<InferInput<TWrapped>, TInput>)`