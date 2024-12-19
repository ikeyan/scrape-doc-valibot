ArgsAction
----------

Args action type.

### Generics

*   `TInput` `extends (...args: any[]) => unknown`
*   `TSchema` `extends LooseTupleSchema<TupleItems, ErrorMessage<LooseTupleIssue> | undefined> | StrictTupleSchema<TupleItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<TupleItems, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchema<TupleItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined>`

### Definition

*   `ArgsAction` `extends BaseTransformation<TInput, (...args: InferInput<TSchema>) => ReturnType<TInput>, never>`
    *   `type` `'args'`
    *   `reference` `typeof args`
    *   `schema` `TSchema`