EveryItemAction
---------------

Every action type.

### Generics

*   `TInput` `extends readonly unknown[]`
*   `TMessage` `extends ErrorMessage<EveryItemIssue<TInput>> | undefined`

### Definition

*   `EveryItemAction` `extends BaseValidation<TInput, TInput, EveryItemIssue<TInput>>`
    *   `type` `'every_item'`
    *   `reference` `typeof everyItem`
    *   `expects` `null`
    *   `requirement` `(item: TInput[number], index: number, array: TInput) => boolean`
    *   `message` `TMessage`