Other
-----

This guide explains other special schema functions such as [`literal`](../api/literal.md), [`instance`](../api/instance.md), [`custom`](../api/custom.md) and [`lazy`](../api/lazy.md) that are not covered in the other guides.

### Literal schema

You can use [`literal`](../api/literal.md) to define a schema that matches a specific string, number or boolean value. Therefore, this schema is perfect for representing [literal types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types). Usage is simple, just pass the value you want to match as the first argument.

    import * as v from 'valibot';
    
    const StringLiteralSchema = v.literal('foo'); // 'foo'
    const NumberLiteralSchema = v.literal(12345); // 12345
    const BooleanLiteralSchema = v.literal(true); // true
    

### Instance schema

With schema functions like [`blob`](../api/blob.md), [`date`](../api/date.md), [`map`](../api/map.md) and [`set`](../api/set.md) Valibot already covers the most common JavaScript classes. However, there are many more classes that you may want to validate. For this purpose, you can use the [`instance`](../api/instance.md) schema function. It takes a class as its first argument and returns a schema that matches only instances of that class.

    import * as v from 'valibot';
    
    const ErrorSchema = v.instance(Error); // Error
    const UrlSchema = v.instance(URL); // URL
    

### Custom schema

The [`custom`](../api/custom.md) schema function is a bit more advanced. It allows you to define a schema that matches a value based on a custom function. Use it whenever you need to define a schema that cannot be expressed using any of the other schema functions.

The function receives the value to validate as its first argument and must return a boolean value. If the function returns `true`, the value is considered valid. Otherwise, it is considered invalid.

    import * as v from 'valibot';
    
    const PixelStringSchema = v.custom<`${number}px`>((input) =>
      typeof input === 'string' ? /^\d+px$/.test(input) : false
    );
    

### Lazy schema

The [`lazy`](../api/lazy.md) schema function allows you to define recursive schemas. A recursive schema is a schema that references itself. For example, you can use it to define a schema for a tree-like data structure.

> Due to a TypeScript limitation, the input and output types cannot be inferred automatically in this case. Therefore, you must explicitly specify these types using the [`GenericSchema`](../api/GenericSchema.md) type.

    import * as v from 'valibot';
    
    type BinaryTree = {
      element: string;
      left: BinaryTree | null;
      right: BinaryTree | null;
    };
    
    const BinaryTreeSchema: v.GenericSchema<BinaryTree> = v.object({
      element: v.string(),
      left: v.nullable(v.lazy(() => BinaryTreeSchema)),
      right: v.nullable(v.lazy(() => BinaryTreeSchema)),
    });