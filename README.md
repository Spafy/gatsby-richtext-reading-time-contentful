# gatsby-richtext-reading-time-contentful

A Gatsby plugin to calculate the **estimated reading time** for **Contentful Rich Text fields** and add it as a field in your Gatsby GraphQL schema.

---

## 📦 Installation

To use this plugin in your Gatsby project, install it using:

```bash
npm install gatsby-richtext-reading-time-contentful
```

## ⚙️ Configuration

Add the plugin to your **`gatsby-config.js`** file and if you want to specify the content types that you want to process, add the `contentTypes` option.

### Example Configuration:

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-richtext-reading-time-contentful`,
      options: {
        contentTypes: [`ContentfulBlogPost`],
      },
    },
  ],
}
```

### 🚀 Usage

Once the plugin is installed and configured, it will process your specified Rich Text fields and add a new field called ${fieldName}TimeToRead to your GraphQL schema.

```javascript
{
  contentfulBlogPost(slug: { eq: $slug }) {
    slug
    title
    fields {
      bodyTimeToRead
    }
  }
}
```

