EmptyAction
-----------

Empty action type.

### Generics

*   `TInput` `extends LengthInput`
*   `TMessage` `extends ErrorMessage<EmptyIssue<TInput, TRequirement>> | undefined`

### Definition

*   `EmptyAction` `extends BaseValidation<TInput, TInput, EmptyIssue<TInput, TRequirement>>`
    *   `type` `'empty'`
    *   `reference` `typeof empty`
    *   `expects` `'0'`
    *   `message` `TMessage`