NullishSchemaAsync
------------------

Nullish schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, null | undefined>`

### Definition

*   `Nullish` `BaseSchemaAsync<InferInput<TWrapped> | null | undefined, InferNullishOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'nullish'`
    *   `reference` `typeof nullishAsync`
    *   `expects` `` `(${TWrapped['expects']} | null | undefined)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`