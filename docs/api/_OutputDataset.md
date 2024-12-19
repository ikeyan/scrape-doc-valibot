OutputDataset
-------------

Output dataset type.

### Generics

*   `TValue` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `OutputDataset` `SuccessDataset<TValue> | PartialDataset<TValue, TIssue> | FailureDataset<TIssue>`