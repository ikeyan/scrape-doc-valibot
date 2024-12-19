picklist
--------

Creates a picklist schema.

    const Schema = v.picklist<TOptions, TMessage>(options, message);
    

### Generics

*   `TOptions` `extends PicklistOptions`
*   `TMessage` `extends ErrorMessage<PicklistIssue> | undefined`

### Parameters

*   `options` `TOptions`
*   `message` `TMessage`

#### Explanation

With `picklist` you can validate that the input corresponds to a picklist option. If the input is invalid, you can use `message` to customize the error message.

> `picklist` works in a similar way to [`enum`](enum.md). However, in many cases it is easier to use because you can pass an array of values instead of an enum.

### Returns

*   `Schema` `PicklistSchema<TOptions, TMessage>`

### Examples

The following examples show how `picklist` can be used.

#### Language schema

Schema to validate programming languages.

    const LanguageSchema = v.picklist(['JavaScript', 'TypeScript']);
    

#### Country schema

Schema to validate country codes.

    const countries = [
      { name: 'Germany', code: 'DE' },
      { name: 'France', code: 'FR' },
      { name: 'United States', code: 'US' },
    ] as const;
    
    const CountrySchema = v.picklist(
      countries.map((country) => country.code),
      'Please select your country.'
    );
    

### Related

The following APIs can be combined with `picklist`.

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