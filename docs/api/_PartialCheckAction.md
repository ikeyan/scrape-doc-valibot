PartialCheckAction
------------------

Partial check action type.

### Generics

*   `TInput` `extends PartialInput`
*   `TSelection` `extends PartialInput`
*   `TMessage` `extends ErrorMessage<PartialCheckIssue<TSelection>> | undefined`

### Definition

*   `PartialCheckAction` `extends BaseValidation<TInput, TInput, PartialCheckIssue<TSelection>>`
    *   `type` `'partial_check'`
    *   `reference` `typeof partialCheck`
    *   `expects` `null`
    *   `requirement` `(input: TSelection) => boolean`
    *   `message` `TMessage`