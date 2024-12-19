CheckItemsAction
----------------

Check items action type.

### Generics

*   `TInput` `extends ArrayInput`
*   `TMessage` `extends ErrorMessage<CheckItemsIssue<TInput>> | undefined`

### Definition

*   `CheckItemsAction` `extends BaseValidation<TInput, TInput, CheckItemsIssue<TInput>>`
    *   `type` `'check_items'`
    *   `reference` `typeof checkItems`
    *   `expects` `null`
    *   `requirement` `ArrayRequirement<TInput>`
    *   `message` `TMessage`