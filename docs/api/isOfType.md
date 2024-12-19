isOfType
--------

A generic type guard to check the type of an object.

    const result = v.isOfType<TType, TObject>(type, object);
    

### Generics

*   `TType` `extends TObject['type']`
*   `TObject` `extends { type: string }`

### Parameters

*   `type` `TType`
*   `object` `TObject`

### Returns

*   `result` `boolean`