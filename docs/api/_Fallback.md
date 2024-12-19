Fallback
--------

Fallback type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `Fallback` `extends InferOutput<TSchema> | ((dataset?: OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>, config?: Config<InferIssue<TSchema>>) => InferOutput<TSchema>)`