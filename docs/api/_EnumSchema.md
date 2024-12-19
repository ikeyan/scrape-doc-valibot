EnumSchema
----------

Enum schema type.

### Generics

*   `TEnum` `extends Enum`
*   `TMessage` `extends ErrorMessage<EnumIssue> | undefined`

### Definition

*   `EnumSchema` `extends BaseSchema<TEnum[keyof TEnum], TEnum[keyof TEnum], EnumIssue>`
    *   `type` `'enum'`
    *   `reference` `typeof enum`
    *   `enum` `TEnum`
    *   `options` `TEnum[keyof TEnum][]`
    *   `message` `TMessage`