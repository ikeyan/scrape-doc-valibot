InstanceSchema
--------------

Instance schema type.

### Generics

*   `TClass` `extends Class`
*   `TMessage` `extends ErrorMessage<InstanceIssue> | undefined`

### Definition

*   `InstanceSchema` `extends BaseSchema<InstanceType<TClass>, InstanceType<TClass>, InstanceIssue>`
    *   `type` `'instance'`
    *   `reference` `typeof instance`
    *   `class` `TClass`
    *   `message` `TMessage`