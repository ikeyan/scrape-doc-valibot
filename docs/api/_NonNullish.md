NonNullish
----------

Extracts `null` and `undefined` from a type.

### Generics

*   `TValue` `extends any`

### Definition

*   `NonNullish` `TValue extends null | undefined ? never : TValue`