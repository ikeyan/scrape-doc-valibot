VariantSchemaAsync
------------------

Variant schema async type.

### Generics

*   `TKey` `extends string`
*   `TOptions` `extends VariantOptionsAsync<TKey>`
*   `TMessage` `extends ErrorMessage<VariantIssue> | undefined`

### Definition

*   `VariantSchemaAsync` `extends BaseSchemaAsync<InferInput<TOptions[number]>, InferOutput<TOptions[number]>, VariantIssue | InferVariantIssue<TOptions>>`
    *   `type` `'variant'`
    *   `reference` `typeof variantAsync`
    *   `expects` `'Object'`
    *   `key` `TKey`
    *   `options` `TOptions`
    *   `message` `TMessage`