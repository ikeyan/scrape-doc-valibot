MapItemsAction
--------------

Map items action type.

### Generics

*   `TInput` `extends ArrayInput`
*   `TOutput` `extends any`

### Definition

*   `MapItemsAction` `extends BaseTransformation<TInput, TOuput[], never>`
    *   `type` `'map_items'`
    *   `reference` `typeof mapItems`
    *   `operation` `(item: TInput[number], index: number, array: TInput) => TOutput`