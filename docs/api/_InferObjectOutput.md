InferObjectOutput
-----------------

Infer object output type.

    // Create object entries
    const entries = {
      key: v.pipe(
        v.string(),
        v.transform((input) => input.length)
      ),
    };
    
    // Infer entries output type
    type EntriesOutput = v.InferObjectOutput<typeof entries>; // { key: number }