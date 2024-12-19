TupleWithRestSchemaAsync
------------------------

Tuple with rest schema async type.

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<TupleWithRestIssue> | undefined`

### Definition

*   `TupleWithRestSchemaAsync` `extends BaseSchemaAsync<[...InferTupleInput<TItems>, ...InferInput<TRest>[]], [...InferTupleOutput<TItems>, ...InferOutput<TRest>[]], TupleWithRestIssue | InferTupleIssue<TItems> | InferIssue<TRest>>`
    *   `type` `'tuple_with_rest'`
    *   `reference` `typeof tupleWithRestAsync`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `rest` `TRest`
    *   `message` `TMessage`