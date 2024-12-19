variantAsync
------------

Creates a variant schema.

    const Schema = v.variantAsync<TKey, TOptions, TMessage>(key, options, message);
    

### Generics

*   `TKey` `extends string`
*   `TOptions` `extends VariantOptionsAsync<TKey>`
*   `TMessage` `extends ErrorMessage<VariantIssue> | undefined`

### Parameters

*   `key` `TKey`
*   `options` `TOptions`
*   `message` `TMessage`

#### Explanation

With `variantAsync` you can validate if the input matches one of the given object `options`. The object schema to be used for the validation is determined by the discriminator `key`. If the input does not match a schema and cannot be clearly assigned to one of the options, you can use `message` to customize the error message.

> It is allowed to specify the exact same or a similar discriminator multiple times. However, in such cases `variantAsync` will only return the output of the first untyped or typed variant option result. Typed results take precedence over untyped ones.

> For deeply nested `variant` schemas with several different discriminator keys, `variant` will return an issue for the first most likely object schemas on invalid input. The order of the discriminator keys and the presence of a discriminator in the input are taken into account.

### Returns

*   `Schema` `VariantSchemaAsync<TKey, TOptions, TMessage>`

### Examples

The following examples show how `variantAsync` can be used.

#### Message schema

Schema to validate a message object.

    import { isValidGroupReceiver, isValidUserReceiver } from '~/api';
    
    const MessageSchema = v.objectAsync({
      message: v.pipe(v.string(), v.nonEmpty()),
      receiver: v.variantAsync('type', [
        v.objectAsync({
          type: v.literal('group'),
          groupId: v.pipeAsync(
            v.string(),
            v.uuid(),
            v.checkAsync(isValidGroupReceiver, 'The group cannot receive messages.')
          ),
        }),
        v.objectAsync({
          type: v.literal('user'),
          email: v.pipeAsync(
            v.string(),
            v.email(),
            v.checkAsync(isValidUserReceiver, 'The user cannot receive messages.')
          ),
        }),
      ]),
    });
    

#### User schema

Schema to validate unique user details.

    import { isRegisteredEmail, isRegisteredUsername, isValidUserId } from '~/api';
    
    const UserSchema = v.variantAsync('type', [
      // Assume this schema is from a different file and reused here.
      v.variantAsync('type', [
        v.objectAsync({
          type: v.literal('email'),
          email: v.pipeAsync(
            v.string(),
            v.email(),
            v.checkAsync(isRegisteredEmail, 'The email is not registered.')
          ),
        }),
        v.objectAsync({
          type: v.literal('username'),
          username: v.pipeAsync(
            v.string(),
            v.nonEmpty(),
            v.checkAsync(isRegisteredUsername, 'The username is not registered.')
          ),
        }),
      ]),
      v.objectAsync({
        type: v.literal('userId'),
        userId: v.pipeAsync(
          v.string(),
          v.uuid(),
          v.checkAsync(isValidUserId, 'The user id is not valid.')
        ),
      }),
    ]);
    

### Related

The following APIs can be combined with `variantAsync`.

#### Schemas

*   [`looseObject`](looseObject.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`strictObject`](strictObject.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
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

#### Async

*   [`checkAsync`](checkAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`transformAsync`](transformAsync.md)