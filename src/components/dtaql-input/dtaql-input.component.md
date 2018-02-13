# dtaql-input

DTAQL input is

## Usage

```html
<dtaql-input [tables]="tablesScheme"></dtaql-input>
```

## Attributes

`tables` - an array of table schemes to use in request

## Events

`change(query)` - is triggered every time the query is changed

## Tables Scheme

The table scheme is an object that contains 2 required fields: `name` and `columns`.
Here is an example:

```js
{
    name: 'users',
    columns: [ 'id', 'name', 'email', 'address' ]
}
```
