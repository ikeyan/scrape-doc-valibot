MapSchemaAsync
--------------

Map schema async type.

### Generics

*   `TKey` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<MapIssue> | undefined`

### Definition

*   `MapSchemaAsync` `extends BaseSchemaAsync<InferMapInput<TKey, TValue>, InferMapOutput<TKey, TValue>, MapIssue | InferIssue<TKey> | InferIssue<TValue>>`
    *   `type` `'map'`
    *   `reference` `typeof mapAsync`
    *   `expects` `'Map'`
    *   `key` `TKey`
    *   `value` `TValue`
    *   `message` `TMessage`