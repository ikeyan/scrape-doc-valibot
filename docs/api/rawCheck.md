rawCheck
--------

Creates a raw check validation action.

    const Action = v.rawCheck<TInput>(action);
    

### Generics

*   `TInput` `extends any`

### Parameters

*   `action` `(context: Context<TInput>) => void`

#### Explanation

With `rawCheck` you can freely validate the input with a custom `action` and add issues if necessary.

### Returns

*   `Action` `RawCheckAction<TInput>`

### Examples

The following examples show how `rawCheck` can be used.

#### Emails schema

Object schema that ensures that the primary email is not the same as any of the other emails.

> This `rawCheck` validation action adds an issue for any invalid other email and forwards it via `path` to the appropriate nested field.

    const EmailsSchema = v.pipe(
      v.object({
        primaryEmail: v.pipe(v.string(), v.email()),
        otherEmails: v.array(v.pipe(v.string(), v.email())),
      }),
      v.rawCheck(({ dataset, addIssue }) => {
        if (dataset.typed) {
          dataset.value.otherEmails.forEach((otherEmail, index) => {
            if (otherEmail === dataset.value.primaryEmail) {
              addIssue({
                message: 'This email is already being used as the primary email.',
                path: [
                  {
                    type: 'object',
                    origin: 'value',
                    input: dataset.value,
                    key: 'otherEmails',
                    value: dataset.value.otherEmails,
                  },
                  {
                    type: 'array',
                    origin: 'value',
                    input: dataset.value.otherEmails,
                    key: index,
                    value: otherEmail,
                  },
                ],
              });
            }
          });
        }
      })
    );
    

### Related

The following APIs can be combined with `rawCheck`.

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

#### Methods

*   [`forward`](forward.md),
*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)