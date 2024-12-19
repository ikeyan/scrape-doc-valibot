InferNonOptionalInput
---------------------

Infer non optional input type.

    // Create optional sting schema
    const OptionalStringSchema = v.optional(
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      )
    );
    
    // Infer non optional string input type
    type NonOptionalStringInput = v.InferNonOptionalInput<
      typeof OptionalStringSchema
    >; // string