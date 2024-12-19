SortItemsAction
---------------

Sort items action type.

### Generics

*   `TInput` `extends ArrayInput`

### Definition

*   `SortItemsAction` `extends BaseTransformation<TInput, TInput, never>`
    *   `type` `'sort_items'`
    *   `reference` `typeof sortItems`
    *   `operation` `((itemA: TInput[number], itemB: TInput[number]) => number) | undefined`