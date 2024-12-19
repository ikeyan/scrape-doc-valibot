BaseMetadata
------------

Base metadata type.

### Generics

*   `TInput` `extends any`

### Definition

*   `BaseMetadata`
    *   `kind` `'metadata'`
    *   `type` `string`
    *   `reference` `(...args: any[]) => BaseMetadata<any>`
    *   `~types` `{ input: TInput, output: TInput, issue: never } | undefined`