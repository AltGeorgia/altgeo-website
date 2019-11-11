# altgeo-website

[![Netlify Status](https://api.netlify.com/api/v1/badges/f44b7cde-d2ee-4e24-af87-67a0834ae8fa/deploy-status)](https://app.netlify.com/sites/altgeo/deploys)

The official website of Alternative Georgia

Available at https://altgeorgia.ge

## Install & run

```
npm i -g gatsby-cli
git clone
cd altgeo-website
npm i
gatsby clean && gatsby develop
```

## Notes

`content/dummy_schema.md` is used as a dummy item to describe every nullable field for 
MarkdownRemarkFrontmatter and MarkdownRemark. Without this file, if a GraphQL query requests a field
that does not exist in the content, the build process will fail because Gatsby will build a schema
which excludes that field.

For example: all publications are removed with the CMS. Next build will fail because kaFile (a field
that would not be included in the final generated schema) will be requested from a query and an 
error will be thrown, stopping the build process.