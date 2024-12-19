LengthAction
------------

Length action type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<LengthIssue<TInput, TRequirement>> | undefined`

### Definition

*   `LengthAction` `extends BaseValidation<TInput, TInput, LengthIssue<TInput, TRequirement>>`
    *   `type` `'length'`
    *   `reference` `typeof length`
    *   `expects` `` `${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`