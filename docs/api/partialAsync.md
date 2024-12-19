partialAsync
------------

Creates a modified copy of an object schema that marks all or only the selected entries as optional.

    const Schema = v.partialAsync<TSchema, TKeys>(schema, keys);
    

### Generics

*   `TSchema` `extends SchemaWithoutPipe<LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined>>`
*   `TKeys` `extends ObjectKeys<TSchema> | undefined`

### Parameters

*   `schema` `TSchema`
*   `keys` `TKey`

#### Explanation

`partialAsync` creates a modified copy of the given object `schema` where all entries or only the selected `keys` are optional. It is similar to TypeScript's [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) utility type.

> Because `partialAsync` changes the data type of the input and output, it is not allowed to pass a schema that has been modified by the [`pipeAsync`](pipeAsync.md) method, as this may cause runtime errors. Please use the [`pipeAsync`](pipeAsync.md) method after you have modified the schema with `partialAsync`.

### Returns

*   `Schema` `SchemaWithPartialAsync<TSchema, TKeys>`

### Examples

The following examples show how `partialAsync` can be used.

#### Update user schema

Schema to update the user details.

    import { isEmailAbsent, isUsernameAbsent } from '~/api';
    
    const UserSchema = v.objectAsync({
      email: v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailAbsent, 'The email is already in the database.')
      ),
      username: v.pipeAsync(
        v.string(),
        v.nonEmpty(),
        v.checkAsync(isUsernameAbsent, 'The username is already in the database.')
      ),
      password: v.pipe(v.string(), v.minLength(8)),
    });
    
    const UpdateUserSchema = v.partialAsync(UserSchema);
    
    /*
      { 
        email?: string;
        username?: string; 
        password?: string;
      }
    */
    

### Related

The following APIs can be combined with `partialAsync`.

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
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`omit`](omit.md),
*   [`keyof`](keyof.md),
*   [`pick`](pick.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

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

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`forwardAsync`](forwardAsync.md),
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
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`undefinedableAsync`](undefinedableAsync.md),
*   [`unionAsync`](unionAsync.md)