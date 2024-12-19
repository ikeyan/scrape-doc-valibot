setAsync
--------

Creates a set schema.

    const Schema = v.setAsync<TValue, TMessage>(value, message);
    

### Generics

*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<SetIssue> | undefined`

### Parameters

*   `value` `TValue`
*   `message` `TMessage`

#### Explanation

With `setAsync` you can validate the data type of the input and whether the content matches `value`. If the input is not a set, you can use `message` to customize the error message.

### Returns

*   `Schema` `SetSchemaAsync<TValue, TMessage>`

### Examples

The following examples show how `setAsync` can be used.

#### Allowed IPs schema

Schema to validate a set of allowed IP addresses.

    import { isIpAllowed } from '~/api';
    
    const AllowedIPsSchema = v.setAsync(
      v.pipeAsync(
        v.string(),
        v.ip(),
        v.checkAsync(isIpAllowed, 'This IP address is not allowed.')
      )
    );
    

### Related

The following APIs can be combined with `setAsync`.

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
*   [`getFallback`](getFallback.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`maxSize`](maxSize.md),
*   [`metadata`](metadata.md),
*   [`minSize`](minSize.md),
*   [`notSize`](notSize.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`size`](size.md),
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
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)