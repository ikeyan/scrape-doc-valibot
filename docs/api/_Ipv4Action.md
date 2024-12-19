Ipv4Action
----------

IPv4 action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Ipv4Issue<TInput>> | undefined`

### Definition

*   `Ipv4Action` `extends BaseValidation<TInput, TInput, Ipv4Issue<TInput>>`
    *   `type` `'ipv4'`
    *   `reference` `typeof ipv4`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`