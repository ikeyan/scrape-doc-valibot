strictTupleAsync
----------------

Creates a strict tuple schema.

    const Schema = v.strictTupleAsync<TItems, TMessage>(items, message);
    

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TMessage` `extends ErrorMessage<StrictTupleIssue> | undefined`

### Parameters

*   `items` `TItems`
*   `message` `TMessage`

#### Explanation

With `strictTupleAsync` you can validate the data type of the input and whether the content matches `items`. If the input is not an array or does include unknown items, you can use `message` to customize the error message.

> The difference to [`tupleAsync`](tupleAsync.md) is that this schema returns an issue for unknown items. It intentionally returns only one issue. Otherwise, attackers could send large arrays to exhaust device resources. If you want an issue for every unknown item, use the [`tupleWithRestAsync`](tupleWithRestAsync.md) schema with [`never`](never.md) for the `rest` argument.

### Returns

*   `Schema` `StrictTupleSchemaAsync<TItems, TMessage>`

### Examples

The following examples show how `strictTupleAsync` can be used. Please see the [arrays guide](../guides/arrays.md) for more examples and explanations.

#### Number and email tuple

Schema to validate a strict tuple with one number and one stored email address.

    import { isEmailPresent } from '~/api';
    
    const TupleSchema = v.strictTupleAsync([
      v.number(),
      v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPresent, 'The email is not in the database.')
      ),
    ]);
    

### Related

The following APIs can be combined with `strictTupleAsync`.

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
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)