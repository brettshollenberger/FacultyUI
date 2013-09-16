#Shareable

The Shareable Directive provides Facebook and Twitter sharing icons for your blog-style application. Shareable uses the URL of the current page to create share links, and Facebook and Twitter use the page's meta data to create titles and descriptions, so make sure to update the HEAD content of your pages for shareable to work appropriately.

To add shareable to your templates, declare it as an element, and set the `shareable-facebook` or `shareable-twitter` attributes:

  <shareable shareable-facebook shareable-twitter></shareable>

These default to using the Font-Awesome Facebook and Twitter icons, but you can also specify images to use instead:

  <shareable shareable-facebook="https://static.hubspot.com/final/img/common/icons/social/facebook-24x24.png" shareable-twitter="https://static.hubspot.com/final/img/common/icons/social/twitter-24x24.png"></shareable>
