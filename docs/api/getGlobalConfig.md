getGlobalConfig
---------------

Returns the global configuration.

    const config = v.getGlobalConfig<TIssue>(merge);
    

### Generics

*   `TIssue` `extends BaseIssue<unknown>`

### Parameters

*   `merge` `Config<TIssue> | undefined`

#### Explanation

Properties that you want to explicitly override can be optionally specified with `merge`.

### Returns

*   `config` `Config<TIssue>`