SetSchema
---------

Set schema type.

### Generics

*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `ErrorMessage<SetIssue> | undefined`

### Definition

*   `SetSchema` `extends BaseSchema<InferSetInput<TValue>, InferSetOutput<TValue>, SetIssue | InferIssue<TValue>>`
    *   `type` `'set'`
    *   `reference` `typeof set`
    *   `expects` `'Set'`
    *   `value` `TValue`
    *   `message` `TMessage`