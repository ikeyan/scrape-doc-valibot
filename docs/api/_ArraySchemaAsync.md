ArraySchemaAsync
----------------

Array schema async type.

### Generics

*   `TItem` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<ArrayIssue> | undefined`

### Definition

*   `ArraySchemaAsync` `extends BaseSchemaAsync<InferInput<TItem>[], InferOutput<TItem>[], ArrayIssue | InferIssue<TItem>>`
    *   `type` `'array'`
    *   `reference` `typeof arrayAsync`
    *   `expects` `'Array'`
    *   `item` `TItem`
    *   `message` `TMessage`