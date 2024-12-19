Schemas
-------

Schemas allow you to validate a specific data type. They are similar to type definitions in TypeScript. Besides primitive values like strings and complex values like objects, Valibot also supports special cases like literals, unions and custom types.

### Primitive values

Valibot supports the creation of schemas for any primitive data type. These are immutable values that are stored directly in the stack, unlike objects where only a reference to the heap is stored.

Primitive schemas:*   [`bigint`](../api/bigint.md),
*   [`boolean`](../api/boolean.md),
*   [`null`](../api/null.md),
*   [`number`](../api/number.md),
*   [`string`](../api/string.md),
*   [`symbol`](../api/symbol.md),
*   [`undefined`](../api/undefined.md)

    import * as v from 'valibot';
    
    const BigintSchema = v.bigint(); // bigint
    const BooleanSchema = v.boolean(); // boolean
    const NullSchema = v.null(); // null
    const NumberSchema = v.number(); // number
    const StringSchema = v.string(); // string
    const SymbolSchema = v.symbol(); // symbol
    const UndefinedSchema = v.undefined(); // undefined
    

### Complex values

Among complex values, Valibot supports objects, records, arrays, tuples, and several other classes.

> There are various methods for objects such as [`pick`](../api/pick.md), [`omit`](../api/omit.md), [`partial`](../api/partial.md) and [`required`](../api/required.md). Learn more about them [here](methods.md).

Complex schemas:*   [`array`](../api/array.md),
*   [`blob`](../api/blob.md),
*   [`date`](../api/date.md),
*   [`file`](../api/file.md),
*   [`function`](../api/function.md),
*   [`looseObject`](../api/looseObject.md),
*   [`looseTuple`](../api/looseTuple.md),
*   [`map`](../api/map.md),
*   [`object`](../api/object.md),
*   [`objectWithRest`](../api/objectWithRest.md),
*   [`promise`](../api/promise.md),
*   [`record`](../api/record.md),
*   [`set`](../api/set.md),
*   [`strictObject`](../api/strictObject.md),
*   [`strictTuple`](../api/strictTuple.md),
*   [`tuple`](../api/tuple.md),
*   [`tupleWithRest`](../api/tupleWithRest.md)

    import * as v from 'valibot';
    
    const ArraySchema = v.array(v.string()); // string[]
    const BlobSchema = v.blob(); // Blob
    const DateSchema = v.date(); // Date
    const FileSchema = v.file(); // File
    const FunctionSchema = v.function(); // (...args: unknown[]) => unknown
    const LooseObjectSchema = v.looseObject({ key: v.string() }); // { key: string }
    const LooseTupleSchema = v.looseTuple([v.string(), v.number()]); // [string, number]
    const MapSchema = v.map(v.string(), v.number()); // Map<string, number>
    const ObjectSchema = v.object({ key: v.string() }); // { key: string }
    const ObjectWithRestSchema = v.objectWithRest({ key: v.string() }, v.null()); // { key: string } & { [key: string]: null }
    const PromiseSchema = v.promise(); // Promise<unknown>
    const RecordSchema = v.record(v.string(), v.number()); // Record<string, number>
    const SetSchema = v.set(v.number()); // Set<number>
    const StrictObjectSchema = v.strictObject({ key: v.string() }); // { key: string }
    const StrictTupleSchema = v.strictTuple([v.string(), v.number()]); // [string, number]
    const TupleSchema = v.tuple([v.string(), v.number()]); // [string, number]
    const TupleWithRestSchema = v.tupleWithRest([v.string(), v.number()], v.null()); // [string, number, ...null[]]
    

### Special cases

Beyond primitive and complex values, there are also schema functions for more special cases.

Special schemas:*   [`any`](../api/any.md),
*   [`custom`](../api/custom.md),
*   [`enum`](../api/enum.md),
*   [`instance`](../api/instance.md),
*   [`intersect`](../api/intersect.md),
*   [`lazy`](../api/lazy.md),
*   [`literal`](../api/literal.md),
*   [`nan`](../api/nan.md),
*   [`never`](../api/never.md),
*   [`nonNullable`](../api/nonNullable.md),
*   [`nonNullish`](../api/nonNullish.md),
*   [`nonOptional`](../api/nonOptional.md),
*   [`nullable`](../api/nullable.md),
*   [`nullish`](../api/nullish.md),
*   [`optional`](../api/optional.md),
*   [`picklist`](../api/picklist.md),
*   [`undefinedable`](../api/undefinedable.md),
*   [`union`](../api/union.md),
*   [`unknown`](../api/unknown.md),
*   [`variant`](../api/variant.md),
*   [`void`](../api/void.md)

    import * as v from 'valibot';
    
    const AnySchema = v.any(); // any
    const CustomSchema = v.custom<`${number}px`>(isPixelString); // `${number}px`
    const EnumSchema = v.enum(Direction); // Direction
    const InstanceSchema = v.instance(Error); // Error
    const LazySchema = v.lazy(() => v.string()); // string
    const IntersectSchema = v.intersect([v.string(), v.literal('a')]); // string & 'a'
    const LiteralSchema = v.literal('foo'); // 'foo'
    const NanSchema = v.nan(); // NaN
    const NeverSchema = v.never(); // never
    const NonNullableSchema = v.nonNullable(v.nullable(v.string())); // string
    const NonNullishSchema = v.nonNullish(v.nullish(v.string())); // string
    const NonOptionalSchema = v.nonOptional(v.optional(v.string())); // string
    const NullableSchema = v.nullable(v.string()); // string | null
    const NullishSchema = v.nullish(v.string()); // string | null | undefined
    const OptionalSchema = v.optional(v.string()); // string | undefined
    const PicklistSchema = v.picklist(['a', 'b']); // 'a' | 'b'
    const UndefinedableSchema = v.undefinedable(v.string()); // string | undefined
    const UnionSchema = v.union([v.string(), v.number()]); // string | number
    const UnknownSchema = v.unknown(); // unknown
    const VariantSchema = v.variant('type', [
      v.object({ type: v.literal('a'), foo: v.string() }),
      v.object({ type: v.literal('b'), bar: v.number() }),
    ]); // { type: 'a'; foo: string } | { type: 'b'; bar: number }
    const VoidSchema = v.void(); // void