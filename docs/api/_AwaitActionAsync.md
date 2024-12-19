AwaitActionAsync
----------------

Await action async type.

### Generics

*   `TInput` `extends Promise<unknown>`

### Definition

*   `AwaitActionAsync` `extends BaseTransformationAsync<TInput, Awaited<TInput>, never>`
    *   `type` `'await'`
    *   `reference` `typeof awaitAsync`