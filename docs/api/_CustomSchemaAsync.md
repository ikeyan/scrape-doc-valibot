CustomSchemaAsync
-----------------

Custom schema async type.

### Generics

*   `TInput` `extends any`
*   `TMessage` `extends ErrorMessage<CustomIssue> | undefined`

### Definition

*   `CustomSchemaAsync` `extends BaseSchemaAsync<TInput, TInput, CustomIssue>`
    *   `type` `'custom'`
    *   `reference` `typeof customAsync`
    *   `expects` `'unknown'`
    *   `check` `(input: unknown) => MaybePromise<boolean>`
    *   `message` `TMessage`