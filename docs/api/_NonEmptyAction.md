NonEmptyAction
--------------

Non empty action type.

### Generics

*   `TInput` `extends LengthInput`
*   `TMessage` `extends ErrorMessage<NonEmptyIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NonEmptyAction` `extends BaseValidation<TInput, TInput, NonEmptyIssue<TInput, TRequirement>>`
    *   `type` `'non_empty'`
    *   `reference` `typeof nonEmpty`
    *   `expects` `'!0'`
    *   `message` `TMessage`