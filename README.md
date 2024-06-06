# Typeahead

This is a typeahead module built to simplify usage of twitter's typeahead.js library. It is designed to be as simple as possible to use.

## Usage

```javascript
import TypeaheadBuilder from '@davetheitguy/typeahead';

// Minimal configuration
const builder = new TypeaheadBuilder();
builder.withInput(document.getElementById('input'));
builder.withCallback((item) => {
    console.log(item);
});
builder.withName('myTypeahead');
builder.withAjaxSource('/api/data');
builder.build();
```

Function calls can also be chained:

```javascript
import TypeaheadBuilder from '@davetheitguy/typeahead';

new TypeaheadBuilder()
  .withInput(document.getElementById('input'))
  .withCallback((item) => {
    console.log(item);
  })
  .withName('myTypeahead')
  .withAjaxSource('/api/data')
  .build();
```
