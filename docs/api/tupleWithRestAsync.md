tupleWithRestAsync
------------------

Creates a tuple with rest schema.

    const Schema = v.tupleWithRestAsync<TItems, TRest, TMessage>(
      items,
      rest,
      message
    );
    

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<TupleWithRestIssue> | undefined`

### Parameters

*   `items` `TItems`
*   `rest` `TRest`
*   `message` `TMessage`

#### Explanation

With `tupleWithRestAsync` you can validate the data type of the input and whether the content matches `items` and `rest`. If the input is not an array, you can use `message` to customize the error message.

### Returns

*   `Schema` `TupleWithRestSchemaAsync<TItems, TRest, TMessage>`

### Examples

The following examples show how `tupleWithRestAsync` can be used. Please see the [arrays guide](../guides/arrays.md) for more examples and explanations.

#### Tuple schema with rest

Schema to validate a tuple with generic rest items.

    import { isEmailPresent } from '~/api';
    
    const TupleSchemaWithRest = v.tupleWithRestAsync(
      [
        v.number(),
        v.pipeAsync(
          v.string(),
          v.email(),
          v.checkAsync(isEmailPresent, 'The email is not in the database.')
        ),
      ],
      v.boolean()
    );
    

### Related

The following APIs can be combined with `tupleWithRestAsync`.

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
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`empty`](empty.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`includes`](includes.md),
*   [`length`](length.md),
*   [`mapItems`](mapItems.md),
*   [`maxLength`](maxLength.md),
*   [`metadata`](metadata.md),
*   [`minLength`](minLength.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notLength`](notLength.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`someItem`](someItem.md),
*   [`sortItems`](sortItems.md),
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
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)