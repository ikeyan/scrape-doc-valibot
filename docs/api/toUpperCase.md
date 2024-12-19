toUpperCase
-----------

Creates a to upper case transformation action.

    const Action = v.toUpperCase();
    

### Returns

*   `Action` `ToUpperCaseAction`

### Examples

The following examples show how `toUpperCase` can be used.

#### Lower case string

Schema that transforms a string to upper case.

    const StringSchema = v.pipe(v.string(), v.toUpperCase());
    

### Related

The following APIs can be combined with `toUpperCase`.

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