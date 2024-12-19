LastTupleItem
-------------

Extracts last tuple item.

### Generics

*   `TTuple` `extends [unknown, ...unknown[]]`

### Definition

*   `LastTupleItem` `TTuple[TTuple extends [unknown, ...TRest] ? TRest['length'] : never]`