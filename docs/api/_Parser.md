Parser
------

The parser type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TConfig` `extends Config<InferIssue<TSchema>> | undefined`

### Definition

*   `Parser`
    *   `(input: unknown) => InferOutput<TSchema>`
    *   `schema` `TSchema`
    *   `config` `TConfig`