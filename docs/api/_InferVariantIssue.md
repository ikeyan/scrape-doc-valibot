InferVariantIssue
-----------------

Infer variant issue type.

### Generics

*   `TOptions` `extends VariantOptions<string> | VariantOptionsAsync<string>`

### Definition

*   `InferVariantIssue` `Exclude<InferIssue<TOptions[number]>, { type: 'loose_object' | 'object' | 'object_with_rest' }>`