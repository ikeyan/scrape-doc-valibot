InferNonNullishOutput
---------------------

Infer non nullable output type.

    // Create nullish sting schema
    const NullishStringSchema = v.nullish(
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      )
    );
    
    // Infer non nullish string output type
    type NonNullishStringOutput = v.InferNonNullishOutput<
      typeof NullishStringSchema
    >; // number