SchemaWithoutPipe
-----------------

Schema without pipe type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `SchemaWithoutPipe` `TSchema & { pipe?: never }`