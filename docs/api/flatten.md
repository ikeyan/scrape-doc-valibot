flatten
-------

Flatten the error messages of issues.

    const errors = v.flatten<TSchema>(issues);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `issues` `[InferIssue<TSchema>, ...InferIssue<TSchema>[]]`

#### Explanation

The error messages of issues without a path that belong to the root of the schema are added to the `.root` key.

The error messages of Issues with a path that belong to the nested parts of the schema and can be converted to a dot path are added to the `.nested` key.

Some issue paths, for example for complex data types like `Set` and `Map`, have no key or a key that cannot be converted to a dot path. These error messages are added to the `.other` key.

### Returns

*   `errors` `FlatErrors<TSchema>`

### Examples

The following example show how `flatten` can be used.

    const Schema = v.object({
      nested: v.object({
        key: v.string('Value of "nested.key" is missing.'),
      }),
    });
    
    const result = v.safeParse(Schema, { nested: {} });
    
    if (result.issues) {
      const flatErrors = v.flatten<typeof Schema>(result.issues);
    
      // ...
    }
    

### Related

The following APIs can be combined with `flatten`.

#### Methods

*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`safeParse`](safeParse.md)