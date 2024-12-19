DateSchema
----------

Date schema type.

### Generics

*   `TMessage` `extends ErrorMessage<DateIssue> | undefined`

### Definition

*   `DateSchema` `extends BaseSchema<Date, Date, DateIssue>`
    *   `type` `'date'`
    *   `reference` `typeof date`
    *   `expects` `'Date'`
    *   `message` `TMessage`