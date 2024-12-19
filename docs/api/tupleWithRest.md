tupleWithRest
-------------

Creates a tuple with rest schema.

    const Schema = v.tupleWithRest<TItems, TRest, TMessage>(items, rest, message);
    

### Generics

*   `TItems` `extends TupleItems`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<TupleWithRestIssue> | undefined`

### Parameters

*   `items` `TItems`
*   `rest` `TRest`
*   `message` `TMessage`

#### Explanation

With `tupleWithRest` you can validate the data type of the input and whether the content matches `items` and `rest`. If the input is not an array, you can use `message` to customize the error message.

### Returns

*   `Schema` `TupleWithRestSchema<TItems, TRest, TMessage>`

### Examples

The following examples show how `tupleWithRest` can be used. Please see the [arrays guide](../guides/arrays.md) for more examples and explanations.

#### Tuple schema with rest

Schema to validate a tuple with generic rest items.

    const TupleSchemaWithRest = v.tupleWithRest(
      [v.string(), v.number()],
      v.boolean()
    );
    

### Related

The following APIs can be combined with `tupleWithRest`.

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

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

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