InferOutput
-----------

Infer output type.

### Generics

*   `TItem` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>`

### Definition

*   `InferIssue` `NonNullable<TItem['~types']>['output']`

### Example

    // Create object schema
    const ObjectSchema = v.object({
      key: v.pipe(
        v.string(),
        v.transform((input) => input.length)
      ),
    });
    
    // Infer object output type
    type ObjectOutput = v.InferOutput<typeof ObjectSchema>; // { key: number }