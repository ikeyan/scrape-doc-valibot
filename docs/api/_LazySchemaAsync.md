LazySchemaAsync
---------------

Lazy schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `LazySchemaAsync` `extends BaseSchemaAsync<InferInput<TWrapped>, InferOutput<TWrapped>, InferIssue<TWrapped>>`
    *   `type` `'lazy'`
    *   `reference` `typeof lazyAsync`
    *   `expects` `'unknown'`
    *   `getter` `(input: unknown) => MaybePromise<TWrapped>`