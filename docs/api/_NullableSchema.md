NullableSchema
--------------

Nullable schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped, null>`

### Definition

*   `NullableSchema` `extends BaseSchema<InferInput<TWrapped> | null, InferNullableOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'nullable'`
    *   `reference` `typeof nullable`
    *   `expects` `` `(${TWrapped['expects']} | null)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`