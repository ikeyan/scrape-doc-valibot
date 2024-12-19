intersectAsync
--------------

Creates an intersect schema.

> I recommend to read the [intersections guide](../guides/intersections.md) before using this schema function.

    const Schema = v.intersectAsync<TOptions, TMessage>(options, message);
    

### Generics

*   `TOptions` `extends IntersectOptionsAsync`
*   `TMessage` `extends ErrorMessage<IntersectIssue> | undefined`

### Parameters

*   `options` `TOptions`
*   `message` `TMessage`

#### Explanation

With `intersectAsync` you can validate if the input matches each of the given `options`. If the output of the intersection cannot be successfully merged, you can use `message` to customize the error message.

### Returns

*   `Schema` `IntersectSchemaAsync<TOptions, TMessage>`

### Examples

The following examples show how `intersectAsync` can be used.

#### Donation schema

Schema that combines objects to validate donation details.

    import { isOrganizationPresent } from '~/api';
    
    const DonationSchema = v.intersectAsync([
      v.objectAsync({
        organizationId: v.pipeAsync(
          v.string(),
          v.uuid(),
          v.checkAsync(
            isOrganizationPresent,
            'The organization is not in the database.'
          )
        ),
      }),
      // Assume the schemas below are from different files and are reused here
      v.object({
        amount: v.pipe(v.number(), v.minValue(100)),
        message: v.pipe(v.string(), v.nonEmpty()),
      }),
      v.object({
        amount: v.pipe(v.number(), v.maxValue(1_000_000)),
        message: v.pipe(v.string(), v.maxLength(500)),
      }),
    ]);
    

### Related

The following APIs can be combined with `intersectAsync`.

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
*   [`getFallback`](getFallback.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexColor`](hexColor.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

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
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)