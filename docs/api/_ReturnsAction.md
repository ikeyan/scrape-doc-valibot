ReturnsAction
-------------

Returns action type.

### Generics

*   `TInput` `extends (...args: any[]) => unknown`
*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `ReturnsAction` `extends BaseTransformation<TInput, (...args: Parameters<TInput>) => InferOutput<TSchema>, never>`
    *   `type` `'returns'`
    *   `reference` `typeof returns`
    *   `schema` `TSchema`