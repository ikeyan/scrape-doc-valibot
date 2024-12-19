InferInput
----------

Infer input type.

### Generics

*   `TItem` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>`

### Definition

*   `InferInput` `NonNullable<TItem['~types']>['input']`

### Example

    // Create object schema
    const ObjectSchema = v.object({
      key: v.pipe(
        v.string(),
        v.transform((input) => input.length)
      ),
    });
    
    // Infer object input type
    type ObjectInput = v.InferInput<typeof ObjectSchema>; // { key: string }