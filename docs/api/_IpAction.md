IpAction
--------

IP action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IpIssue<TInput>> | undefined`

### Definition

*   `IpAction` `extends BaseValidation<TInput, TInput, IpIssue<TInput>>`
    *   `type` `'ip'`
    *   `reference` `typeof ip`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`