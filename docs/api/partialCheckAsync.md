partialCheckAsync
-----------------

Creates a partial check validation action.

    const Action = v.partialCheckAsync<TInput, TPathList, TSelection, TMessage>(
      pathList,
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends PartialInput`
*   `TPathList` `extends readonly PathKeys<TInput>[]`
*   `TSelection` `extends DeepPickN<TInput, TPathList>`
*   `TMessage` `extends ErrorMessage<PartialCheckIssue<TSelection>> | undefined`

### Parameters

*   `pathList` `TPathList`
*   `requirement` `(input: TSelection) => MaybePromise<boolean>`
*   `message` `TMessage`

#### Explanation

With `partialCheckAsync` you can freely validate the selected input and return `true` if it is valid or `false` otherwise. If the input does not match your `requirement`, you can use `message` to customize the error message.

> The difference to [`checkAsync`](checkAsync.md) is that `partialCheckAsync` can be executed whenever the selected part of the data is valid, while [`checkAsync`](checkAsync.md) is executed only when the entire dataset is typed. This can be an important advantage when working with forms.

### Returns

*   `Action` `PartialCheckActionAsync<TInput, TSelection, TMessage>`

### Examples

The following examples show how `partialCheckAsync` can be used.

#### Message details schema

Schema to validate details associated with a message.

    import { isSenderInTheGroup } from '~/api';
    
    const MessageDetailsSchema = v.pipeAsync(
      v.object({
        sender: v.object({
          name: v.pipe(v.string(), v.minLength(2), v.maxLength(45)),
          email: v.pipe(v.string(), v.email()),
        }),
        groupId: v.pipe(v.string(), v.uuid()),
        message: v.pipe(v.string(), v.nonEmpty(), v.maxLength(500)),
      }),
      v.forwardAsync(
        v.partialCheckAsync(
          [['sender', 'email'], ['groupId']],
          (input) =>
            isSenderInTheGroup({
              senderEmail: input.sender.email,
              groupId: input.groupId,
            }),
          'The sender is not in the group.'
        ),
        ['sender', 'email']
      )
    );
    

### Related

The following APIs can be combined with `partialCheckAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`record`](record.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`union`](union.md),
*   [`variant`](variant.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`forwardAsync`](forwardAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)