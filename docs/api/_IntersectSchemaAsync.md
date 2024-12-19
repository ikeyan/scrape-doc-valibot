IntersectSchemaAsync
--------------------

Intersect schema async type.

### Generics

*   `TOptions` `extends IntersectOptionsAsync`
*   `TMessage` `extends ErrorMessage<IntersectIssue> | undefined`

### Definition

*   `IntersectSchemaAsync` `extends BaseSchemaAsync<InferIntersectInput<TOptions>, InferIntersectOutput<TOptions>, IntersectIssue | InferIssue<TOptions[number]>>`
    *   `type` `'intersect'`
    *   `reference` `typeof intersectAsync`
    *   `options` `TOptions`
    *   `message` `TMessage`