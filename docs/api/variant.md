variant
-------

Creates a variant schema.

    const Schema = v.variant<TKey, TOptions, TMessage>(key, options, message);
    

### Generics

*   `TKey` `extends string`
*   `TOptions` `extends VariantOptions<TKey>`
*   `TMessage` `extends ErrorMessage<VariantIssue> | undefined`

### Parameters

*   `key` `TKey`
*   `options` `TOptions`
*   `message` `TMessage`

#### Explanation

With `variant` you can validate if the input matches one of the given object `options`. The object schema to be used for the validation is determined by the discriminator `key`. If the input does not match a schema and cannot be clearly assigned to one of the options, you can use `message` to customize the error message.

> It is allowed to specify the exact same or a similar discriminator multiple times. However, in such cases `variant` will only return the output of the first untyped or typed variant option result. Typed results take precedence over untyped ones.

> For deeply nested `variant` schemas with several different discriminator keys, `variant` will return an issue for the first most likely object schemas on invalid input. The order of the discriminator keys and the presence of a discriminator in the input are taken into account.

### Returns

*   `Schema` `VariantSchema<TKey, TOptions, TMessage>`

### Examples

The following examples show how `variant` can be used.

#### Variant schema

Schema to validate an email, URL or date variant.

    const VariantSchema = v.variant('type', [
      v.object({
        type: v.literal('email'),
        email: v.pipe(v.string(), v.email()),
      }),
      v.object({
        type: v.literal('url'),
        url: v.pipe(v.string(), v.url()),
      }),
      v.object({
        type: v.literal('date'),
        date: v.pipe(v.string(), v.isoDate()),
      }),
    ]);
    

#### Nested variant schema

You can also nest `variant` schemas.

    const NestedVariantSchema = v.variant('type', [
      VariantSchema,
      v.object({
        type: v.literal('color'),
        date: v.pipe(v.string(), v.hexColor()),
      }),
    ]);
    

#### Complex variant schema

You can also use `variant` to validate complex objects with multiple different discriminator keys.

    const ComplexVariantSchema = v.variant('kind', [
      v.variant('type', [
        v.object({
          kind: v.literal('fruit'),
          type: v.literal('apple'),
          item: v.object({ … }),
        }),
        v.object({
          kind: v.literal('fruit'),
          type: v.literal('banana'),
          item: v.object({ … }),
        }),
      ]),
      v.variant('type', [
        v.object({
          kind: v.literal('vegetable'),
          type: v.literal('carrot'),
          item: v.object({ … }),
        }),
        v.object({
          kind: v.literal('vegetable'),
          type: v.literal('tomato'),
          item: v.object({ … }),
        }),
      ]),
    ]);
    

### Related

The following APIs can be combined with `variant`.

#### Schemas

*   [`object`](object.md)

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
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)