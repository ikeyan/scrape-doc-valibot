UndefinedableSchemaAsync
------------------------

Undefinedable schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, undefined>`

### Definition

*   `UndefinedableSchemaAsync` `BaseSchemaAsync<InferInput<TWrapped> | undefined, InferUndefinedableOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'undefinedable'`
    *   `reference` `typeof undefinedableAsync`
    *   `expects` `` `(${TWrapped['expects']} | undefined)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`