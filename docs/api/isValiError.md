isValiError
-----------

A type guard to check if an error is a ValiError.

    const result = v.isValiError<TSchema>(error);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `error` `unknown`

### Returns

*   `result` `boolean`