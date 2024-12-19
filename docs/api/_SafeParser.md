SafeParser
----------

The safe parser type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TConfig` `extends Config<InferIssue<TSchema>> | undefined`

### Definition

*   `SafeParser`
    *   `(input: unknown) => SafeParseResult<TSchema>`
    *   `schema` `TSchema`
    *   `config` `TConfig`