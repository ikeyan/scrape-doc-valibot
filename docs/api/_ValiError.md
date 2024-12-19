ValiError
---------

Creates a Valibot error with useful information.

    const error = new v.ValiError<TSchema>(issues);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `issues` `[InferIssue<TSchema>, ...InferIssue<TSchema>[]]`

### Returns

*   `error` `ValiError<TSchema>`