InferObjectInput
----------------

Infer object input type.

    // Create object entries
    const entries = {
      key: v.pipe(
        v.string(),
        v.transform((input) => input.length)
      ),
    };
    
    // Infer entries input type
    type EntriesInput = v.InferObjectInput<typeof entries>; // { key: string }