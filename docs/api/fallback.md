fallback
--------

Returns a fallback value as output if the input does not match the schema.

    const Schema = v.fallback<TSchema, TFallback>(schema, fallback);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TFallback` `extends Fallback<TSchema>`

### Parameters

*   `schema` `TSchema`
*   `fallback` `TFallback`

#### Explanation

`fallback` allows you to define a fallback value for the output that will be used if the validation of the input fails. This means that no issues will be returned when using `fallback` and the schema will always return an output.

> If you only want to set a default value for `null` or `undefined` inputs, you should use [`optional`](optional.md), [`nullable`](nullable.md) or [`nullish`](nullish.md) instead.

> The fallback value is not validated. Make sure that the fallback value matches your schema.

### Returns

*   `Schema` `SchemaWithFallback<TSchema, TFallback>`

### Examples

The following examples show how `fallback` can be used.

#### Fallback string schema

Schema that will always return a string output.

    const FallbackStringSchema = v.fallback(v.string(), "I'm the fallback!");
    

#### Fallback date schema

Schema that will always return a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) output.

> By using a function as the `fallback` parameter, the schema will return a new [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) instance each time the input does not match the schema.

    const FallbackDateSchema = v.fallback(v.date(), () => new Date());
    

### Related

The following APIs can be combined with `fallback`.

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

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

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
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
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

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)