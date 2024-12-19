UnionSchemaAsync
----------------

Union schema async type.

### Generics

*   `TOptions` `extends UnionOptionsAsync`
*   `TMessage` `extends ErrorMessage<UnionIssue<InferIssue<TOptions[number]>>> | undefined`

### Definition

*   `UnionSchemaAsync` `BaseSchemaAsync<InferInput<TOptions[number]>, InferOutput<TOptions[number]>, UnionIssue<InferIssue<TOptions[number]>> | InferIssue<TOptions[number]>>`
    *   `type` `'union'`
    *   `reference` `typeof unionAsync`
    *   `options` `TOptions`
    *   `message` `TMessage`