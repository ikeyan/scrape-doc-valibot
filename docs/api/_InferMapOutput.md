InferMapOutput
--------------

Infer map output type.

### Generics

*   `TKey` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `InferMapOutput` `Map<InferOutput<TKey>, InferOutput<TValue>>`