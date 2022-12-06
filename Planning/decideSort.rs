The sort component doesn't care if there are images that fit the sort. It should only care about the category of the image that it is in
The sort options only change when the subCat changes

1. Get the subCat from the url
2. Decide based on that subCat which variables to set to true and which to set to false



IF there's no value for that param: 
you put the param in
If there's 1 value for that param:
you put the param alongside what is there
if the value that you've clicked upon is the same as the query one:
remove that one
if the value that you've clicked upon is the same as one of the query ones :
remove that one from the query