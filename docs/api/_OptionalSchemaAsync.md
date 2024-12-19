OptionalSchemaAsync
-------------------

Optional schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, undefined>`

### Definition

*   `OptionalSchemaAsync` `BaseSchemaAsync<InferInput<TWrapped> | undefined, InferOptionalOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'optional'`
    *   `reference` `typeof optionalAsync`
    *   `expects` `` `(${TWrapped['expects']} | undefined)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`