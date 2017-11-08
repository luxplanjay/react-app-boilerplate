# React App Boilerplate

## TODO

- Need to add ContextReplacementPlugin, example below

``` javascript
new webpack.ContextReplacementPlugin(
      // The path to directory which should be handled by this plugin
      /moment[\/\\]locale/,
      // A regular expression matching files that should be included
      /(en-gb|ru)\.js/
    )
```

- Add support for [lodash-es](https://www.npmjs.com/package/lodash-es) and [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash)

- Look into [webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin)