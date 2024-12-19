InferNonNullableInput
---------------------

Infer non nullable input type.

    // Create nullable sting schema
    const NullableStringSchema = v.nullable(
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      )
    );
    
    // Infer non nullable string input type
    type NonNullableStringInput = v.InferNonNullableInput<
      typeof NullableStringSchema
    >; // string