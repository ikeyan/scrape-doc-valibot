TupleSchemaAsync
----------------

Tuple schema async type.

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TMessage` `extends ErrorMessage<TupleIssue> | undefined`

### Definition

*   `TupleSchemaAsync` `extends BaseSchemaAsync<InferTupleInput<TItems>, InferTupleOutput<TItems>, TupleIssue | InferTupleIssue<TItems>>`
    *   `type` `'tuple'`
    *   `reference` `typeof tupleAsync`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `message` `TMessage`