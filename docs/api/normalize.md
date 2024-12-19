normalize
---------

Creates a normalize transformation action.

    const Action = v.normalize<TForm>(form);
    

### Generics

*   `TForm` `extends NormalizeForm | undefined`

### Parameters

*   `form` `TForm`

### Returns

*   `Action` `NormalizeAction`

### Examples

The following examples show how `normalize` can be used.

#### Normalized string

Schema to normalize a string.

    const StringSchema = v.pipe(v.string(), v.normalize());
    

### Related

The following APIs can be combined with `normalize`.

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