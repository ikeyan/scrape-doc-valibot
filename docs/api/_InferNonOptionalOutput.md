InferNonOptionalOutput
----------------------

Infer non optional output type.

    // Create optional sting schema
    const OptionalStringSchema = v.optional(
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      )
    );
    
    // Infer non optional string output type
    type NonOptionalStringOutput = v.InferNonOptionalOutput<
      typeof OptionalStringSchema
    >; // number