RecordSchema
------------

Record schema type.

### Generics

*   `TKey` `extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<RecordIssue> | undefined`

### Definition

*   `RecordSchema` `extends BaseSchema<InferRecordInput<TKey, TValue>, InferRecordOutput<TKey, TValue>, RecordIssue | InferIssue<TKey> | InferIssue<TValue>>`
    *   `type` `'record'`
    *   `reference` `typeof record`
    *   `expects` `'Object'`
    *   `key` `TKey`
    *   `value` `TValue`
    *   `message` `TMessage`