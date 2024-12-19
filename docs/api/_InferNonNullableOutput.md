InferNonNullableOutput
----------------------

Infer non nullable output type.

    // Create nullable sting schema
    const NullableStringSchema = v.nullable(
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      )
    );
    
    // Infer non nullable string output type
    type NonNullableStringOutput = v.InferNonNullableOutput<
      typeof NullableStringSchema
    >; // number