InferIntersectInput
-------------------

Infer intersect input type.

    // Create object schemas
    const ObjectSchemas = [
      v.object({
        key1: v.pipe(
          v.string(),
          v.transform((input) => input.length)
        ),
      }),
      v.object({
        key2: v.pipe(
          v.string(),
          v.transform((input) => input.length)
        ),
      }),
    ];
    
    // Infer object intersect input type
    type ObjectInput = v.InferIntersectInput<typeof ObjectSchemas>; // { key1: string } & { key2: string }