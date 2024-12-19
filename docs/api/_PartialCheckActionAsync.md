PartialCheckActionAsync
-----------------------

Partial check action async type.

### Generics

*   `TInput` `extends PartialInput`
*   `TSelection` `extends PartialInput`
*   `TMessage` `extends ErrorMessage<PartialCheckIssue<TSelection>> | undefined`

### Definition

*   `PartialCheckActionAsync` `extends BaseValidationAsync<TInput, TInput, PartialCheckIssue<TSelection>>`
    *   `type` `'partial_check'`
    *   `reference` `typeof partialCheckAsync`
    *   `expects` `null`
    *   `requirement` `(input: TSelection) => MaybePromise<boolean>`
    *   `message` `TMessage`