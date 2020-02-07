// Mock data to get the Gutenberg editor to work

export const media = {
  headers: {
    get: value => {
      if (value === 'allow') {
        return ['POST']
      }
    }
  }
}

export const page = {
  id: 1,
  content: {
    raw: '',
    rendered: ''
  },
  title: {
    raw: 'Preview page',
    rendered: 'Preview page'
  },
  excerpt: {
    raw: '',
    rendered: ''
  },
  status: 'pending',
  revisions: { count: 0, last_id: 0 },
  parent: 0,
  theme_style: true,
  type: 'page',
  link: `${window.location.origin}/preview`,
  categories: [],
  featured_media: 0,
  permalink_template: `${window.location.origin}/preview`,
  preview_link: `${window.location.origin}/preview`,
  _links: {
    // 'wp:action-assign-categories': [],
    // 'wp:action-create-categories': [],
    // 'wp:action-publish': [],
    // 'wp:action-sticky': []
  },
  // functions
  setContent: (content) => {
    page.content = {
      raw: content
    }
  }
}

export const themes = [{
  theme_supports: {
    formats: [
      'standard',
      'aside',
      'image',
      'video',
      'quote',
      'link',
      'gallery',
      'audio'
    ],
    'post-thumbnails': true,
    'responsive-embeds': true
  }
}]

export const types = {
  page: {
    id: 1,
    labels: {},
    name: 'Page',
    rest_base: 'pages',
    slug: 'page',
    supports: {
      author: false,
      comments: false, // hide discussion-panel
      'custom-fields': true,
      editor: true,
      excerpt: false,
      discussion: false,
      'page-attributes': false, // hide page-attributes panel
      revisions: false,
      thumbnail: false, // featured-image panel
      title: false // show title on editor
    },
    taxonomies: ['asefasef'],
    viewable: false,
    saveable: false,
    publishable: false,
    autosaveable: false
  },
  block: {
    capabilities: {},
    name: 'Blocks',
    rest_base: 'blocks',
    slug: 'wp_block',
    description: '',
    hierarchical: false,
    supports: {
      title: true,
      editor: true
    },
    viewable: true
  }
}

export const user = {
  id: 1,
  name: 'bnu',
  url: '',
  description: '',
  link: 'http://wp.bnu.udd.kr/author/bnu/',
  slug: 'bnu',
  avatar_urls: {
    24: 'http://2.gravatar.com/avatar/89faf515298da5d0c7177f81e0376b06?s=24&d=mm&r=g',
    48: 'http://2.gravatar.com/avatar/89faf515298da5d0c7177f81e0376b06?s=48&d=mm&r=g',
    96: 'http://2.gravatar.com/avatar/89faf515298da5d0c7177f81e0376b06?s=96&d=mm&r=g'
  },
  meta: [],
  _links: {
    self: [
      {
        href: 'http://wp.bnu.udd.kr/wp-json/wp/v2/users/1'
      }
    ],
    collection: [
      {
        href: 'http://wp.bnu.udd.kr/wp-json/wp/v2/users'
      }
    ]
  }
}
