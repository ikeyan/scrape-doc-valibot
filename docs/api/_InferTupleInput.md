InferTupleInput
---------------

Infer tuple output type.

    // Create tuple items
    const items = [
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      ),
    ];
    
    // Infer items input type
    type ItemsInput = v.InferTupleInput<typeof items>; // [string]