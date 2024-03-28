# JOGP

A Cloudflare Worker that retrieves the Open Graph Protocol (OGP) data from a URL passed as a parameter and returns it as JSON.

## Example

https://jogp.hatsu38.workers.dev/?url=https://github.com/

```json
{
  "og:image": "https://github.githubassets.com/assets/campaign-social-031d6161fa10.png",
  "og:image:alt": "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea...",
  "og:site_name": "GitHub",
  "og:type": "object",
  "og:title": "GitHub: Let’s build from here",
  "og:url": "https://github.com/",
  "og:description": "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea...",
  "og:image:type": "image/png",
  "og:image:width": "1200",
  "og:image:height": "630"
}
```
