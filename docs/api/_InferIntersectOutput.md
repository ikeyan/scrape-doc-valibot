InferIntersectOutput
--------------------

Infer intersect output type.

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
    
    // Infer object intersect output type
    type ObjectOutput = v.InferIntersectOutput<typeof ObjectSchemas>; // { key1: number } & { key2: number }