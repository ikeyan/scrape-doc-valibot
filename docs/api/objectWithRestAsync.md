objectWithRestAsync
-------------------

Creates an object with rest schema.

    const Schema = v.objectWithRestAsync<TEntries, TRest, TMessage>(
      entries,
      rest,
      message
    );
    

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<ObjectWithRestIssue> | undefined`

### Parameters

*   `entries` `TEntries`
*   `rest` `TRest`
*   `message` `TMessage`

#### Explanation

With `objectWithRestAsync` you can validate the data type of the input and whether the content matches `entries` and `rest`. If the input is not an object, you can use `message` to customize the error message.

> The difference to [`objectAsync`](objectAsync.md) is that this schema includes unknown entries in the output. In addition, this schema filters certain entries from the unknown entries for security reasons.

> This schema does not distinguish between missing and `undefined` entries. The reason for this decision is that it reduces the bundle size, and we also expect that most users will expect this behavior.

### Returns

*   `Schema` `ObjectWithRestSchemaAsync<TEntries, TRest, TMessage>`

### Examples

The following examples show how `objectWithRestAsync` can be used. Please see the [object guide](../guides/objects.md) for more examples and explanations.

#### Word map schema

Schema to validate an object with word map mutation details.

    import { isUserAllowedToMutate } from '~/api';
    
    // Assume the rest of the keys are always English words
    const WordMapSchema = v.objectWithRestAsync(
      {
        $userId: v.pipeAsync(
          v.string(),
          v.regex(/^[a-z0-9]{12}$/i),
          v.checkAsync(
            isUserAllowedToMutate,
            'The user is not allowed to change the word map.'
          )
        ),
        $targetLanguage: v.union([
          v.literal('hindi'),
          v.literal('spanish'),
          v.literal('french'),
        ]),
      },
      v.string()
    );
    

### Related

The following APIs can be combined with `objectWithRestAsync`.

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

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`pick`](pick.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`forwardAsync`](forwardAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
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
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)