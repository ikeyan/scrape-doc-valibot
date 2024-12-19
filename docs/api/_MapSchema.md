MapSchema
---------

Map schema type.

### Generics

*   `TKey` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<MapIssue> | undefined`

### Definition

*   `MapSchema` `extends BaseSchema<InferMapInput<TKey, TValue>, InferMapOutput<TKey, TValue>, MapIssue | InferIssue<TKey> | InferIssue<TValue>>`
    *   `type` `'map'`
    *   `reference` `typeof map`
    *   `expects` `'Map'`
    *   `key` `TKey`
    *   `value` `TValue`
    *   `message` `TMessage`