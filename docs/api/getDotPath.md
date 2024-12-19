getDotPath
----------

Creates and returns the dot path of an issue if possible.

    const dotPath = v.getDotPath<TSchema>(issue);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `issue` `InferIssue<TSchema>`

### Returns

*   `dotPath` `IssueDotPath<TSchema> | null`