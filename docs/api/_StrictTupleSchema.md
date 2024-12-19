StrictTupleSchema
-----------------

Strict tuple schema type.

### Generics

*   `TItems` `extends TupleItems`
*   `TMessage` `extends ErrorMessage<StrictTupleIssue> | undefined`

### Definition

*   `StrictTupleSchema` `extends BaseSchema<InferTupleInput<TItems>, InferTupleOutput<TItems>, StrictTupleIssue | InferTupleIssue<TItems>>`
    *   `type` `'strict_tuple'`
    *   `reference` `typeof strictTuple`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `message` `TMessage`