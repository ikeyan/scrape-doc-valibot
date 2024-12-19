NeverSchema
-----------

Never schema type.

### Generics

*   `TMessage` `extends ErrorMessage<NeverIssue> | undefined`

### Definition

*   `NeverSchema` `extends BaseSchema<never, never, NeverIssue>`
    *   `type` `'never'`
    *   `reference` `readonly never`
    *   `expects` `'never'`
    *   `message` `TMessage`