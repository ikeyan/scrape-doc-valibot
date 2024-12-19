LooseTupleSchema
----------------

Loose tuple schema type.

### Generics

*   `TItems` `extends TupleItems`
*   `TMessage` `extends ErrorMessage<LooseTupleIssue> | undefined`

### Definition

*   `LooseTupleSchema` `extends BaseSchema<[...InferTupleInput<TItems>, ...unknown[]], [...InferTupleOutput<TItems>, ...unknown[]], LooseTupleIssue | InferTupleIssue<TItems>>`
    *   `type` `'loose_tuple'`
    *   `reference` `typeof looseTuple`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `message` `TMessage`