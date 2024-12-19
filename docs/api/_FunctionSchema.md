FunctionSchema
--------------

Function schema type.

### Generics

*   `TMessage` `extends ErrorMessage<FunctionIssue> | undefined`

### Definition

*   `FunctionSchema` `extends BaseSchema<(...args: unknown[]) => unknown, (...args: unknown[]) => unknown, FunctionIssue>`
    *   `type` `'function'`
    *   `reference` `typeof function`
    *   `expects` `'Function'`
    *   `message` `TMessage`