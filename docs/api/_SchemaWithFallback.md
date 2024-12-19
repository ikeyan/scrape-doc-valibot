SchemaWithFallback
------------------

Schema with fallback type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TFallback` `extends Fallback<TSchema>`

### Definition

*   `SchemaWithFallback` `extends TSchema`
    *   `fallback` `TFallback`