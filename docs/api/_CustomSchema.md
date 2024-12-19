CustomSchema
------------

Custom schema type.

### Generics

*   `TInput` `extends any`
*   `TMessage` `extends ErrorMessage<CustomIssue> | undefined`

### Definition

*   `CustomSchema` `extends BaseSchema<TInput, TInput, CustomIssue>`
    *   `type` `'custom'`
    *   `reference` `typeof custom`
    *   `expects` `'unknown'`
    *   `check` `(input: unknown) => boolean`
    *   `message` `TMessage`