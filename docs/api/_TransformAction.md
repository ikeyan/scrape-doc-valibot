TransformAction
---------------

Transform action type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`

### Definition

*   `TransformAction` `extends BaseTransformation<TInput, TOutput, never>`
    *   `type` `'transform'`
    *   `reference` `typeof transform`
    *   `operation` `(input: TInput) => TOutput`