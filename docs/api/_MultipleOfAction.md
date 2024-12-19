MultipleOfAction
----------------

Multiple of action type.

### Generics

*   `TInput` `extends number`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MultipleOfIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MultipleOfAction` `extends BaseValidation<TInput, TInput, MultipleOfIssue<TInput, TRequirement>>`
    *   `type` `'multiple_of'`
    *   `reference` `typeof multipleOf`
    *   `expects` `` `%${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`