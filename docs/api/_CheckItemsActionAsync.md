CheckItemsActionAsync
---------------------

Check items action async type.

### Generics

*   `TInput` `extends ArrayInput`
*   `TMessage` `extends ErrorMessage<CheckItemsIssue<TInput>> | undefined`

### Definition

*   `CheckItemsActionAsync` `extends BaseValidationAsync<TInput, TInput, CheckItemsIssue<TInput>>`
    *   `type` `'check_items'`
    *   `reference` `typeof checkItemsAsync`
    *   `expects` `null`
    *   `requirement` `ArrayRequirementAsync<TInput>`
    *   `message` `TMessage`