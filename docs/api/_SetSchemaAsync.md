SetSchemaAsync
--------------

Set schema async type.

### Generics

*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `ErrorMessage<SetIssue> | undefined`

### Definition

*   `SetSchemaAsync` `extends BaseSchemaAsync<InferSetInput<TValue>, InferSetOutput<TValue>, SetIssue | InferIssue<TValue>>`
    *   `type` `'set'`
    *   `reference` `typeof setAsync`
    *   `expects` `'Set'`
    *   `value` `TValue`
    *   `message` `TMessage`