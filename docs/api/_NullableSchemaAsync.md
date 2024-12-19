NullableSchemaAsync
-------------------

Nullable schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, null>`

### Definition

*   `NullableSchemaAsync` `BaseSchemaAsync<InferInput<TWrapped> | null, InferNullableOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'nullable'`
    *   `reference` `typeof nullableAsync`
    *   `expects` `` `(${TWrapped['expects']} | null)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`