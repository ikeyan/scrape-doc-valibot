NonOptional
-----------

Extracts `undefined` from a type.

### Generics

*   `TValue` `extends any`

### Definition

*   `NonOptional` `TValue extends undefined ? never : TValue`