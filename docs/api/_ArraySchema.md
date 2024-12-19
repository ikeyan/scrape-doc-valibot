ArraySchema
-----------

Array schema type.

### Generics

*   `TItem` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<ArrayIssue> | undefined`

### Definition

*   `ArraySchema` `extends BaseSchema<InferInput<TItem>[], InferOutput<TItem>[], ArrayIssue | InferIssue<TItem>>`
    *   `type` `'array'`
    *   `reference` `typeof array`
    *   `expects` `'Array'`
    *   `item` `TItem`
    *   `message` `TMessage`