SomeItemAction
--------------

Some action type.

### Generics

*   `TInput` `extends readonly unknown[]`
*   `TMessage` `extends ErrorMessage<SomeItemIssue<TInput>> | undefined`

### Definition

*   `SomeItemAction` `extends BaseValidation<TInput, TInput, SomeItemIssue<TInput>>`
    *   `type` `'some_item'`
    *   `reference` `typeof someItem`
    *   `expects` `null`
    *   `requirement` `(item: TInput[number], index: number, array: TInput) => boolean`
    *   `message` `TMessage`