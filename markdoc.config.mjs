import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    media: { // <-- Wir nennen es jetzt allgemein "media"
      render: component('./src/components/Media.astro'),
      attributes: {
        url: { type: String }
      }
    }
  }
});