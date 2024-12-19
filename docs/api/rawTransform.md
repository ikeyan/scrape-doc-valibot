rawTransform
------------

Creates a raw transformation action.

    const Action = v.rawTransform<TInput, TOutput>(action);
    

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`

### Parameters

*   `action` `(context: { dataset: SuccessDataset<TInput>, config: Config<RawCheckIssue<TInput>>, addIssue: (info: { label?: string, input?: unknown, expected?: string, received?: string, message?: ErrorMessage<RawCheckIssue<TInput>>, path?: [IssuePathItem, ...IssuePathItem[]] }) => void, NEVER: never }) => TOutput`

#### Explanation

With `rawTransform` you can freely transform and validate the input with a custom `action` and add issues if necessary.

### Returns

*   `Action` `RawTransformAction<TInput, TOutput>`

### Examples

The following examples show how `rawTransform` can be used.

#### Calculate game result

Schema that calculates the total score of a game based on the scores and a multiplier.

> This `rawTransform` validation action adds an issue for points that exceed a certain maximum and forwards it via `path` to the appropriate nested score.

    const GameResultSchema = v.pipe(
      v.object({
        scores: v.array(v.pipe(v.number(), v.integer())),
        multiplier: v.number(),
      }),
      v.rawTransform(({ dataset, addIssue, NEVER }) => {
        // Create total variable
        let total = 0;
    
        // Iterate over scores and check points
        for (let index = 0; index < dataset.value.scores.length; index++) {
          // Calculate points by multiplying score with multiplier
          const score = dataset.value.scores[index];
          const points = score * dataset.value.multiplier;
    
          // Add issue if points exceed maximum of 1,000 points
          if (points > 1_000) {
            addIssue({
              message:
                'The score exceeds the maximum allowed value of 1,000 points.',
              path: [
                {
                  type: 'object',
                  origin: 'value',
                  input: dataset.value,
                  key: 'scores',
                  value: dataset.value.scores,
                },
                {
                  type: 'array',
                  origin: 'value',
                  input: dataset.value.scores,
                  key: index,
                  value: score,
                },
              ],
            });
    
            // Abort transformation
            return NEVER;
          }
    
          // Add points to total
          total += points;
        }
    
        // Add calculated total to dataset
        return { ...dataset.value, total };
      })
    );
    

### Related

The following APIs can be combined with `rawTransform`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`forward`](forward.md),
*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)