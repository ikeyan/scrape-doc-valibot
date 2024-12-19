trim
----

Creates a trim transformation action.

    const Action = v.trim();
    

### Returns

*   `Action` `TrimAction`

### Examples

The following examples show how `trim` can be used.

#### Trimmed string

Schema to trim the start and end of a string.

    const StringSchema = v.pipe(v.string(), v.trim());
    

### Related

The following APIs can be combined with `trim`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)