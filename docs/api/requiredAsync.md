requiredAsync
-------------

Creates a modified copy of an object schema that marks all or only the selected entries as required.

    const AllKeysSchema = v.requiredAsync<TSchema, TMessage>(schema, message);
    const SelectedKeysSchema = v.requiredAsync<TSchema, TKeys, TMessage>(
      schema,
      keys,
      message
    );
    

### Generics

*   `TSchema` `extends SchemaWithoutPipe<LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined>>`
*   `TKeys` `ObjectKeys<TSchema>`
*   `TMessage` `ErrorMessage<NonOptionalIssue> | undefined`

### Parameters

*   `schema` `TSchema`
*   `keys` `TKey`
*   `message` `TMessage`

#### Explanation

`requiredAsync` creates a modified copy of the given object `schema` where all or only the selected `keys` are required. It is similar to TypeScript's [`Required`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype) utility type.

> Because `requiredAsync` changes the data type of the input and output, it is not allowed to pass a schema that has been modified by the [`pipeAsync`](pipeAsync.md) method, as this may cause runtime errors. Please use the [`pipeAsync`](pipeAsync.md) method after you have modified the schema with `requiredAsync`.

### Returns

*   `AllKeysSchema` `SchemaWithRequiredAsync<TSchema, undefined, TMessage>`
*   `SelectedKeysSchema` `SchemaWithRequiredAsync<TSchema, TKeys, TMessage>`

### Examples

The following examples show how `requiredAsync` can be used.

#### New task schema

Schema to validate an object containing task details.

    import { isOwnerPresent } from '~/api';
    
    const UpdateTaskSchema = v.objectAsync({
      owner: v.optionalAsync(
        v.pipeAsync(
          v.string(),
          v.email(),
          v.checkAsync(isOwnerPresent, 'The owner is not in the database.')
        )
      ),
      title: v.optional(v.pipe(v.string(), v.nonEmpty(), v.maxLength(255))),
      description: v.optional(v.pipe(v.string(), v.nonEmpty())),
    });
    
    const NewTaskSchema = v.requiredAsync(UpdateTaskSchema);
    
    /*
      {
        owner: string;
        title: string;
        description: string;
      }
    */
    

### Related

The following APIs can be combined with `requiredAsync`.

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
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
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
*   [`partialAsync`](partialAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
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
*   [`undefinedableAsync`](undefinedableAsync.md),
*   [`unionAsync`](unionAsync.md)