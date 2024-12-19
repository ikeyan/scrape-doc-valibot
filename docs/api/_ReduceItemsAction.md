ReduceItemsAction
-----------------

Reduce items action type.

### Generics

*   `TInput` `extends ArrayInput`
*   `TOutput` `extends any`

### Definition

*   `ReduceItemsAction` `extends BaseTransformation<TInput, TOuput, never>`
    *   `type` `'reduce_items'`
    *   `reference` `typeof reduceItems`
    *   `operation` `(output: TOutput, item: TInput[number], index: number, array: TInput) => TOutput`
    *   `initial` `TOutput`