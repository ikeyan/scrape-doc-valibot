args
----

Creates a function arguments transformation action.

    const Action = v.args<TInput, TSchema>(schema);
    

### Generics

*   `TInput` `extends (...args: any[]) => unknown`
*   `TSchema` `extends LooseTupleSchema<TupleItems, ErrorMessage<LooseTupleIssue> | undefined> | StrictTupleSchema<TupleItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<TupleItems, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchema<TupleItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined>`

### Parameters

*   `schema` `TSchema`

#### Explanation

With `args` you can force the arguments of a function to match the given `schema`.

### Returns

*   `Action` `ArgsAction<TInput, TSchema>`

### Examples

The following examples show how `args` can be used.

#### Function schema

Schema of a function that transforms a string to a number.

    const FunctionSchema = v.pipe(
      v.function(),
      v.args(v.tuple([v.pipe(v.string(), v.decimal())])),
      v.returns(v.number())
    );
    

### Related

The following APIs can be combined with `args`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`looseTuple`](looseTuple.md),
*   [`function`](function.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)