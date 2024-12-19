InferNonNullishInput
--------------------

Infer non nullable input type.

    // Create nullish sting schema
    const NullishStringSchema = v.nullish(
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      )
    );
    
    // Infer non nullish string input type
    type NonNullishStringInput = v.InferNonNullishInput<typeof NullishStringSchema>; // string