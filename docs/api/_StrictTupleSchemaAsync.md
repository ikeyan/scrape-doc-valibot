StrictTupleSchemaAsync
----------------------

Strict tuple schema async type.

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TMessage` `extends ErrorMessage<StrictTupleIssue> | undefined`

### Definition

*   `StrictTupleSchemaAsync` `extends BaseSchemaAsync<InferTupleInput<TItems>, InferTupleOutput<TItems>, StrictTupleIssue | InferTupleIssue<TItems>>`
    *   `type` `'strict_tuple'`
    *   `reference` `typeof strictTupleAsync`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `message` `TMessage`