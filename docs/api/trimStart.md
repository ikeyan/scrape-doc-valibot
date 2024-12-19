trimStart
---------

Creates a trim start transformation action.

    const Action = v.trimStart();
    

### Returns

*   `Action` `TrimStartAction`

### Examples

The following examples show how `trimStart` can be used.

#### Trimmed string

Schema to trimStart the start of a string.

    const StringSchema = v.pipe(v.string(), v.trimStart());
    

### Related

The following APIs can be combined with `trimStart`.

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