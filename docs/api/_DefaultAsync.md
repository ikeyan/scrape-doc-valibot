DefaultAsync
------------

Default async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TInput` `extends null | undefined`

### Definition

*   `DefaultAsync` `MaybeReadonly<InferInput<TWrapped>, TInput> | ((dataset?: UnknownDataset, config?: Config<InferIssue<TWrapped>>) => MaybePromise<MaybeReadonly<InferInput<TWrapped>, TInput>>)`