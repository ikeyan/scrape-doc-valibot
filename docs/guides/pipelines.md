Pipelines
---------

For detailed validations and transformations, a schema can be wrapped in a pipeline. Especially for schema functions like [`string`](../api/string.md), [`number`](../api/number.md), [`date`](../api/date.md), [`object`](../api/object.md), and [`array`](../api/array.md), this feature is useful for validating properties beyond the raw data type.

### How it works

In simple words, a pipeline is a list of schemas and actions that synchronously passes through the input data. It must always start with a schema, followed by up to 19 schemas or actions. Each schema and action can examine and modify the input. The pipeline is therefore perfect for detailed validations and transformations.

#### Example

For example, the pipeline feature can be used to trim a string and make sure that it is an email that ends with a specific domain.

    import * as v from 'valibot';
    
    const EmailSchema = v.pipe(
      v.string(),
      v.trim(),
      v.email(),
      v.endsWith('@example.com')
    );
    

### Validations

Pipeline validation actions examine the input and, if the input does not meet a certain condition, return an issue. If the input is valid, it is returned as the output and, if present, picked up by the next action in the pipeline.

> Whenever possible, pipelines are run completely, even if an issue has occurred, to collect all possible issues. If you want to abort the pipeline early after the first issue, you need to set the `abortPipeEarly` option to `true`. Learn more about this [here](parse-data.md).

Validation actions:*   [`base64`](../api/base64.md),
*   [`bic`](../api/bic.md),
*   [`bytes`](../api/bytes.md),
*   [`check`](../api/check.md),
*   [`checkItems`](../api/checkItems.md),
*   [`creditCard`](../api/creditCard.md),
*   [`cuid2`](../api/cuid2.md),
*   [`decimal`](../api/decimal.md),
*   [`digits`](../api/digits.md),
*   [`email`](../api/email.md),
*   [`emoji`](../api/emoji.md),
*   [`empty`](../api/empty.md),
*   [`endsWith`](../api/endsWith.md),
*   [`everyItem`](../api/everyItem.md),
*   [`excludes`](../api/excludes.md),
*   [`finite`](../api/finite.md),
*   [`graphemes`](../api/graphemes.md),
*   [`hash`](../api/hash.md),
*   [`hexadecimal`](../api/hexadecimal.md),
*   [`hexColor`](../api/hexColor.md),
*   [`includes`](../api/includes.md),
*   [`integer`](../api/integer.md),
*   [`ip`](../api/ip.md),
*   [`ipv4`](../api/ipv4.md),
*   [`ipv6`](../api/ipv6.md),
*   [`isoDate`](../api/isoDate.md),
*   [`isoDateTime`](../api/isoDateTime.md),
*   [`isoTime`](../api/isoTime.md),
*   [`isoTimeSecond`](../api/isoTimeSecond.md),
*   [`isoTimestamp`](../api/isoTimestamp.md),
*   [`isoWeek`](../api/isoWeek.md),
*   [`length`](../api/length.md),
*   [`mac`](../api/mac.md),
*   [`mac48`](../api/mac48.md),
*   [`mac64`](../api/mac64.md),
*   [`maxBytes`](../api/maxBytes.md),
*   [`maxGraphemes`](../api/maxGraphemes.md),
*   [`maxLength`](../api/maxLength.md),
*   [`maxSize`](../api/maxSize.md),
*   [`maxValue`](../api/maxValue.md),
*   [`maxWords`](../api/maxWords.md),
*   [`mimeType`](../api/mimeType.md),
*   [`minBytes`](../api/minBytes.md),
*   [`minGraphemes`](../api/minGraphemes.md),
*   [`minLength`](../api/minLength.md),
*   [`minSize`](../api/minSize.md),
*   [`minValue`](../api/minValue.md),
*   [`minWords`](../api/minWords.md),
*   [`multipleOf`](../api/multipleOf.md),
*   [`nanoid`](../api/nanoid.md),
*   [`nonEmpty`](../api/nonEmpty.md),
*   [`notBytes`](../api/notBytes.md),
*   [`notGraphemes`](../api/notGraphemes.md),
*   [`notLength`](../api/notLength.md),
*   [`notSize`](../api/notSize.md),
*   [`notValue`](../api/notValue.md),
*   [`notWords`](../api/notWords.md),
*   [`octal`](../api/octal.md),
*   [`partialCheck`](../api/partialCheck.md),
*   [`rawCheck`](../api/rawCheck.md),
*   [`regex`](../api/regex.md),
*   [`safeInteger`](../api/safeInteger.md),
*   [`size`](../api/size.md),
*   [`someItem`](../api/someItem.md),
*   [`startsWith`](../api/startsWith.md),
*   [`ulid`](../api/ulid.md),
*   [`url`](../api/url.md),
*   [`uuid`](../api/uuid.md),
*   [`value`](../api/value.md),
*   [`words`](../api/words.md)

Some of these actions can be combined with different schemas. For example, [`minValue`](../api/minValue.md) can be used to validate the minimum value of [`string`](../api/string.md), [`number`](../api/number.md), [`bigint`](../api/bigint.md), and [`date`](../api/date.md).

    import * as v from 'valibot';
    
    const StringSchema = v.pipe(v.string(), v.minValue('foo'));
    const NumberSchema = v.pipe(v.number(), v.minValue(1234));
    const BigintSchema = v.pipe(v.bigint(), v.minValue(1234n));
    const DateSchema = v.pipe(v.date(), v.minValue(new Date()));
    

#### Custom validation

For custom validations, [`check`](../api/check.md) can be used. If the function passed as the first argument returns `false`, an issue is returned. Otherwise, the input is considered valid.

    import * as v from 'valibot';
    import { isValidUsername } from '~/utils';
    
    const UsernameSchema = v.pipe(
      v.string(),
      v.check(isValidUsername, 'This username is invalid.')
    );
    

> You can forward the issues of a pipeline validation to a child. See the [methods](methods.md) guide for more information.

### Transformations

Pipeline transformation actions allow to change the value and data type of the input data. This can be useful for example to remove spaces at the beginning or end of a string or to force a minimum or maximum value.

Transformation actions:*   [`brand`](../api/brand.md),
*   [`filterItems`](../api/filterItems.md),
*   [`findItem`](../api/findItem.md),
*   [`mapItems`](../api/mapItems.md),
*   [`rawTransform`](../api/rawTransform.md),
*   [`readonly`](../api/readonly.md),
*   [`reduceItems`](../api/reduceItems.md),
*   [`sortItems`](../api/sortItems.md),
*   [`toLowerCase`](../api/toLowerCase.md),
*   [`toMaxValue`](../api/toMaxValue.md),
*   [`toMinValue`](../api/toMinValue.md),
*   [`toUpperCase`](../api/toUpperCase.md),
*   [`transform`](../api/transform.md),
*   [`trim`](../api/trim.md),
*   [`trimEnd`](../api/trimEnd.md),
*   [`trimStart`](../api/trimStart.md)

For example, the pipeline of the following schema enforces a minimum value of 10. If the input is less than 10, it is replaced with the specified minimum value.

    import * as v from 'valibot';
    
    const NumberSchema = v.pipe(v.number(), v.toMinValue(10));
    

#### Custom transformation

For custom transformations, [`transform`](../api/transform.md) can be used. The function passed as the first argument is called with the input data and the return value defines the output. The following transformation changes the output of the schema to `null` for any number less than 10.

    import * as v from 'valibot';
    
    const NumberSchema = v.pipe(
      v.number(),
      v.transform((input) => (input < 10 ? null : input))
    );
    

### Metadata

In addition to the validation and transformation actions, a pipeline can also be used to add metadata to a schema. This can be useful when working with AI tools or for documentation purposes.

Metadata actions:*   [`description`](../api/description.md),
*   [`metadata`](../api/metadata.md),
*   [`title`](../api/title.md)

    const UsernameSchema = v.pipe(
      v.string(),
      v.regex(/^[a-z0-9_-]{4,16}$/iu),
      v.title('Username'),
      v.description(
        'A username must be between 4 and 16 characters long and can only contain letters, numbers, underscores and hyphens.'
      )
    );