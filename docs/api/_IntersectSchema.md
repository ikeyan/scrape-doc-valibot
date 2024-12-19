IntersectSchema
---------------

Intersect schema type.

### Generics

*   `TOptions` `extends IntersectOptions`
*   `TMessage` `extends ErrorMessage<IntersectIssue> | undefined`

### Definition

*   `IntersectSchema` `extends BaseSchema<InferIntersectInput<TOptions>, InferIntersectOutput<TOptions>, IntersectIssue | InferIssue<TOptions[number]>>`
    *   `type` `'intersect'`
    *   `reference` `typeof intersect`
    *   `options` `TOptions`
    *   `message` `TMessage`