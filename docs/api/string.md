string
------

Creates a string schema.

    const Schema = v.string<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<StringIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `string` you can validate the data type of the input. If the input is not a string, you can use `message` to customize the error message.

### Returns

*   `Schema` `StringSchema<TMessage>`

### Examples

The following examples show how `string` can be used.

#### Email schema

Schema to validate an email.

    const EmailSchema = v.pipe(
      v.string(),
      v.nonEmpty('Please enter your email.'),
      v.email('The email is badly formatted.'),
      v.maxLength(30, 'Your email is too long.')
    );
    

#### Password schema

Schema to validate a password.

    const PasswordSchema = v.pipe(
      v.string(),
      v.minLength(8, 'Your password is too short.'),
      v.maxLength(30, 'Your password is too long.'),
      v.regex(/[a-z]/, 'Your password must contain a lowercase letter.'),
      v.regex(/[A-Z]/, 'Your password must contain a uppercase letter.'),
      v.regex(/[0-9]/, 'Your password must contain a number.')
    );
    

#### URL schema

Schema to validate a URL.

    const UrlSchema = v.pipe(
      v.string('A URL must be string.'),
      v.url('The URL is badly formatted.')
    );
    

### Related

The following APIs can be combined with `string`.

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

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`check`](check.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`excludes`](excludes.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
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
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`regex`](regex.md),
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