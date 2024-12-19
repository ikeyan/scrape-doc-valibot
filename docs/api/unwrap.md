unwrap
------

Unwraps the wrapped schema.

    const Schema = v.unwrap<TSchema>(schema);
    

### Generics

*   `TSchema` `extends NonNullableSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonNullableIssue> | undefined> | NonNullableSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonNullableIssue> | undefined> | NonNullishSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonNullishIssue> | undefined> | NonNullishSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonNullishIssue> | undefined> | NonOptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonOptionalIssue> | undefined> | NonOptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonOptionalIssue> | undefined> | NullableSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | NullableSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | NullishSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | NullishSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown>`

### Parameters

*   `schema` `TSchema`

### Returns

*   `Schema` `TSchema['wrapped']`

### Examples

The following examples show how `unwrap` can be used.

#### Unwrap string schema

Unwraps the wrapped string schema.

    const OptionalStringSchema = v.optional(v.string());
    const StringSchema = v.unwrap(OptionalStringSchema);
    

### Related

The following APIs can be combined with `unwrap`.

#### Schemas

*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`optional`](optional.md),
*   [`undefinedable`](undefinedable.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)