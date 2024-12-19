TupleSchema
-----------

Tuple schema type.

### Generics

*   `TItems` `extends TupleItems`
*   `TMessage` `extends ErrorMessage<TupleIssue> | undefined`

### Definition

*   `TupleSchema` `extends BaseSchema<InferTupleInput<TItems>, InferTupleOutput<TItems>, TupleIssue | InferTupleIssue<TItems>>`
    *   `type` `'tuple'`
    *   `reference` `typeof tuple`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `message` `TMessage`