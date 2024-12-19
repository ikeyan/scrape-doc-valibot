rawCheckAsync
-------------

Creates a raw check validation action.

    const Action = v.rawCheckAsync<TInput>(action);
    

### Generics

*   `TInput` `extends any`

### Parameters

*   `action` `(context: Context<TInput>) => MaybePromise<void>`

#### Explanation

With `rawCheckAsync` you can freely validate the input with a custom `action` and add issues if necessary.

### Returns

*   `Action` `RawCheckActionAsync<TInput>`

### Examples

The following examples show how `rawCheckAsync` can be used.

#### Add users schema

Object schema that ensures that only users not already in the group are included.

> This `rawCheckAsync` validation action adds an issue for any invalid username and forwards it via `path` to the appropriate nested field.

    import { isAlreadyInGroup } from '~/api';
    
    const AddUsersSchema = v.pipeAsync(
      v.object({
        groupId: v.pipe(v.string(), v.uuid()),
        usernames: v.array(v.pipe(v.string(), v.nonEmpty())),
      }),
      v.rawCheckAsync(async ({ dataset, addIssue }) => {
        if (dataset.typed) {
          await Promise.all(
            dataset.value.usernames.map(async (username, index) => {
              if (await isAlreadyInGroup(username, dataset.value.groupId)) {
                addIssue({
                  received: username,
                  message: 'The user is already in the group.',
                  path: [
                    {
                      type: 'object',
                      origin: 'value',
                      input: dataset.value,
                      key: 'usernames',
                      value: dataset.value.usernames,
                    },
                    {
                      type: 'array',
                      origin: 'value',
                      input: dataset.value.usernames,
                      key: index,
                      value: username,
                    },
                  ],
                });
              }
            })
          );
        }
      })
    );
    

### Related

The following APIs can be combined with `rawCheckAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

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
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`undefinedableAsync`](undefinedableAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)