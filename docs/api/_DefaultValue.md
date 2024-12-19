DefaultValue
------------

Default value type.

### Generics

*   `TDefault` `extends Default<BaseSchema<unknown, unknown, BaseIssue<unknown>>, null | undefined> | DefaultAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, null | undefined>`

### Definition

*   `DefaultValue` `TDefault extends DefaultAsync<infer TWrapped, infer TInput> ? TDefault extends (dataset?: UnknownDataset, config?: Config<InferIssue<TWrapped>>) => MaybePromise<MaybeReadonly<InferInput<TWrapped>, TInput>> ? Awaited<ReturnType<TDefault>> : TDefault : never`