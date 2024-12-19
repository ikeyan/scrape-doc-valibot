PromiseSchema
-------------

Promise schema type.

### Generics

*   `TMessage` `extends ErrorMessage<PromiseIssue> | undefined`

### Definition

*   `PromiseSchema` `extends BaseSchema<Promise<unknown>, Promise<unknown>, PromiseIssue>`
    *   `type` `'promise'`
    *   `reference` `typeof promise`
    *   `expects` `'Promise'`
    *   `message` `TMessage`