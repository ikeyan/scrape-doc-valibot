trimEnd
-------

Creates a trim end transformation action.

    const Action = v.trimEnd();
    

### Returns

*   `Action` `TrimEndAction`

### Examples

The following examples show how `trimEnd` can be used.

#### Trimmed string

Schema to trimEnd the end of a string.

    const StringSchema = v.pipe(v.string(), v.trimEnd());
    

### Related

The following APIs can be combined with `trimEnd`.

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