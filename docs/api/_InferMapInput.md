InferMapInput
-------------

Infer map input type.

### Generics

*   `TKey` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `InferMapInput` `Map<InferInput<TKey>, InferInput<TValue>>`