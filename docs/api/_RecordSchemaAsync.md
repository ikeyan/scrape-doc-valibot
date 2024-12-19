RecordSchemaAsync
-----------------

Record schema async type.

### Generics

*   `TKey` `extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>> | BaseSchemaAsync<string, string | number | symbol, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<RecordIssue> | undefined`

### Definition

*   `RecordSchemaAsync` `extends BaseSchemaAsync<InferRecordInput<TKey, TValue>, InferRecordOutput<TKey, TValue>, RecordIssue | InferIssue<TKey> | InferIssue<TValue>>`
    *   `type` `'record'`
    *   `reference` `typeof recordAsync`
    *   `expects` `'Object'`
    *   `key` `TKey`
    *   `value` `TValue`
    *   `message` `TMessage`