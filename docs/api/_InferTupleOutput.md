InferTupleOutput
----------------

Infer tuple issue type.

    const items = [
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      ),
    ];
    
    // Infer items output type
    type ItemsOutput = v.InferTupleOutput<typeof items>; // [number]