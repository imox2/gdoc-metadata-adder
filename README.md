# gdoc-metadata-adder
Google Docs Add on enable us to add  Custom File Properties to a file. You can use Drive API to add your own properties to a Google Drive file. These properties are stored as key/value pairs on the file.

*I did not find a way using which I can add custom key-value properties using a UI. So I build this.* 

You can read more about [custom properties](https://developers.google.com/drive/api/v3/properties) 

## Use Case:

 - I want Drive api to fetch only those docs which I have published. In this scenario I will add custom properties to those docs ***eg {type:published}*** then using Drive api I will fetch only such docs. As Properties can also be used in [search expressions](https://developers.google.com/drive/api/v3/search-files#properties).
