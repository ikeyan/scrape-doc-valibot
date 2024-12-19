toLowerCase
-----------

Creates a to lower case transformation action.

    const Action = v.toLowerCase();
    

### Returns

*   `Action` `ToLowerCaseAction`

### Examples

The following examples show how `toLowerCase` can be used.

#### Lower case string

Schema that transforms a string to lower case.

    const StringSchema = v.pipe(v.string(), v.toLowerCase());
    

### Related

The following APIs can be combined with `toLowerCase`.

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