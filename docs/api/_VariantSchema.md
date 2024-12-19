VariantSchema
-------------

Variant schema type.

### Generics

*   `TKey` `extends string`
*   `TOptions` `extends VariantOptions<TKey>`
*   `TMessage` `extends ErrorMessage<VariantIssue> | undefined`

### Definition

*   `VariantSchema` `extends BaseSchema<InferInput<TOptions[number]>, InferOutput<TOptions[number]>, VariantIssue | InferVariantIssue<TOptions[number]>>`
    *   `type` `'variant'`
    *   `reference` `typeof variant`
    *   `expects` `'Object'`
    *   `key` `TKey`
    *   `options` `TOptions`
    *   `message` `TMessage`