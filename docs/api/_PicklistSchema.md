PicklistSchema
--------------

Picklist schema type.

### Generics

*   `TOptions` `extends PicklistOptions`
*   `TMessage` `extends ErrorMessage<PicklistIssue> | undefined`

### Definition

*   `PicklistSchema` `extends BaseSchema<TOptions[number], TOptions[number], PicklistIssue>`
    *   `type` `'picklist'`
    *   `reference` `typeof picklist`
    *   `options` `TOptions`
    *   `message` `TMessage`