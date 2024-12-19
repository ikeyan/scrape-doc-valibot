isOfKind
--------

A generic type guard to check the kind of an object.

    const result = v.isOfKind<TKind, TObject>(kind, object);
    

### Generics

*   `TKind` `extends TObject['kind']`
*   `TObject` `extends { kind: string }`

### Parameters

*   `kind` `TKind`
*   `object` `TObject`

### Returns

*   `result` `boolean`