literal
-------

Creates a literal schema.

    const Schema = v.literal<TLiteral, TMessage>(literal, message);
    

### Generics

*   `TLiteral` `extends Literal`
*   `TMessage` `extends ErrorMessage<LiteralIssue> | undefined`

### Parameters

*   `literal` `TLiteral`
*   `message` `TMessage`

#### Explanation

With `literal` you can validate that the input matches a specified value. If the input is invalid, you can use `message` to customize the error message.

### Returns

*   `Schema` `LiteralSchema<TLiteral, TMessage>`

### Examples

The following examples show how `literal` can be used.

#### String literal

Schema to validate a string literal.

    const StringLiteralSchema = v.literal('foo');
    

#### Number literal

Schema to validate a number literal.

    const NumberLiteralSchema = v.literal(26);
    

#### Boolean literal

Schema to validate a boolean literal.

    const BooleanLiteralSchema = v.literal(true);
    

### Related

The following APIs can be combined with `literal`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

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
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)