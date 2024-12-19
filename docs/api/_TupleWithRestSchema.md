TupleWithRestSchema
-------------------

Tuple with rest schema type.

### Generics

*   `TItems` `extends TupleItems`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<TupleWithRestIssue> | undefined`

### Definition

*   `TupleWithRestSchema` `extends BaseSchema<[...InferTupleInput<TItems>, ...InferInput<TRest>[]], [...InferTupleOutput<TItems>, ...InferOutput<TRest>[]], TupleWithRestIssue | InferTupleIssue<TItems> | InferIssue<TRest>>`
    *   `type` `'tuple_with_rest'`
    *   `reference` `typeof tupleWithRest`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `rest` `TRest`
    *   `message` `TMessage`