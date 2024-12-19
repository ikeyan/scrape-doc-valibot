Ipv6Action
----------

IPv6 action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Ipv6Issue<TInput>> | undefined`

### Definition

*   `Ipv6Action` `extends BaseValidation<TInput, TInput, Ipv6Issue<TInput>>`
    *   `type` `'ipv6'`
    *   `reference` `typeof ipv6`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`