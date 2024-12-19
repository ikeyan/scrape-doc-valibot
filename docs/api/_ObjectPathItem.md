ObjectPathItem
--------------

Object path item type.

### Definition

*   `ObjectPathItem`
    *   `type` `'object'`
    *   `origin` `'key' | 'value'`
    *   `input` `Record<string, unknown>`
    *   `key` `string`
    *   `value` `unknown`

The `input` of a path item may differ from the `input` of its issue. This is because path items are subsequently added by parent schemas and are related to their input. Transformations of child schemas are not taken into account.