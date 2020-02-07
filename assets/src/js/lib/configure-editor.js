// import { data } from '@frontkom/gutenberg-js'
import { editorSettings } from '../gutenberg/settings'
import { elementRendered } from './element-ready'
import registerSidebar from '../sidebar/sidebar'
import setupLaravelFilemanager from '../laravel-filemanager'
import setupMockFilemanager from '../mock-file-uploader'
import setupActions from './actions'

const { data } = window.wp

/**
 * Configures the editor according to the provided options object
 * @param {Object} options
 */
export default function configureEditor (options) {
  setupActions()
  setupMedia(options)
  setupSidebar(options)
  setupSubmit(editorSettings.target)
  disableWPBlocks()
  removeElements()
  if (options.maxHeight) { setMaxHeight(options.maxHeight) }
  if (options.minHeight) { setMinHeight(options.minHeight) }
  if (options.height) { setHeight(options.height) }
}

/**
 * Set all editor button types to 'button' to prevent submitting the form
 */
export function clearSubmitFromButtons () {
  // Add class to all buttons that are in a form inside the editor
  elementRendered('.xe-blockeditor__editor form button', (el) => {
    el.classList.add('lb-form__button')
  })
  // Set type to 'button' for all buttons not in a form
  // We'll assume that Gutenberg correctly sets the button types for buttons that are in a form
  elementRendered('.xe-blockeditor__editor button:not(.lb-form__button)', (el) => {
    el.type = 'button'
  })
}

function disableWPBlocks () {
  data.dispatch('core/blocks').removeBlockTypes([
    'core/archives',
    'core/categories',
    'core/freeform',
    'core/latest-comments',
    'core/latest-posts',
    'core/more',
    'core/nextpage',
    'core/page-break',
    'core/shortcode',
    'core/calendar',
    'core/rss',
    'core/search',
    'core/tag-cloud',
    'core/embed',
    'core-embed/twitter',
    'core-embed/youtube',
    'core-embed/facebook',
    'core-embed/instagram',
    'core-embed/wordpress',
    'core-embed/soundcloud',
    'core-embed/spotify',
    'core-embed/flickr',
    'core-embed/vimeo',
    'core-embed/animoto',
    'core-embed/cloudup',
    'core-embed/collegehumor',
    'core-embed/crowdsignal',
    'core-embed/dailymotion',
    'core-embed/hulu',
    'core-embed/imgur',
    'core-embed/issuu',
    'core-embed/kickstarter',
    'core-embed/meetup-com',
    'core-embed/mixcloud',
    'core-embed/polldaddy',
    'core-embed/reddit',
    'core-embed/reverbnation',
    'core-embed/screencast',
    'core-embed/scribd',
    'core-embed/slideshare',
    'core-embed/smugmug',
    'core-embed/speaker',
    'core-embed/speaker-deck',
    'core-embed/ted',
    'core-embed/tumblr',
    'core-embed/videopress',
    'core-embed/wordpress-tv',
    'core-embed/amazon-kindle'
  ])
}

/**
 * Sets the max-height style value
 * @param {String} maxHeight css value for max-height
 */
function setMaxHeight (maxHeight) {
  const editor = window.Laraberg.editor
  editor.style.maxHeight = maxHeight

  elementRendered('.edit-post-layout__content', (el) => {
    el.style.minHeight = `calc(${maxHeight} - 56px)`
  })
}

/**
 * Sets the min-height style value
 * @param {String} minHeight css value for min-height
 */
function setMinHeight (minHeight) {
  const editor = window.Laraberg.editor
  editor.style.minHeight = minHeight

  elementRendered('.edit-post-sidebar', (el) => {
    el.style.minHeight = `calc(${minHeight} - 56px)`
  })
}

/**
 * Sets the height style value
 * @param {String} height css value for height
 */
function setHeight (height) {
  const editor = window.Laraberg.editor
  editor.classList.add('fixed-height')
  editor.style.height = height
}

/**
 * Setup media upload capabilities according to provided options
 * @param {Object} options the options object provided on initialization
 */
function setupMedia (options) {
  removeUploadButton()
  if (options.laravelFilemanager) {
    setupLaravelFilemanager(options.laravelFilemanager)
  } else {
    setupMockFilemanager()
    data.dispatch('core/blocks').removeBlockTypes([
      'core/cover',
      'core/gallery',
      'core/media-text'
    ])
  }
}

function setupSidebar (options) {
  if (options.sidebar) {
    registerSidebar()
  }
}

/**
 * Makes sure the textarea value gets set to the editor content on submit
 * @param {string} target the textarea to set the value of
 */
function setupSubmit (target) {
  clearSubmitFromButtons()
  const textarea = document.getElementById(target)

  if (textarea.form) {

    window.jQuery(function () {
      const $metaboxes = window.jQuery('#metaboxes')

      window.jQuery(document).on('change', '.__taxonomy-field input', function () {
        const $this = window.jQuery(this)
        const fieldName = $this.attr('name')
        const value = $this.val()

        if (!$metaboxes.find(`[name=${fieldName}]`).length) {
          $metaboxes.append(window.jQuery(`<input type="text" name="${fieldName}">`)).val(value)
        }

        $metaboxes.find(`[name=${fieldName}]`).val(value)
      })
    })

    textarea.form.addEventListener('submit', event => {
      textarea.value = data.select('core/editor').getEditedPostContent()
      // Clear content "dirty" state.
      // data.dispatch('core/editor').savePost()

      // board tag
      const $tagField = window.jQuery('#xeBoardTagWrap')
      const $metaboxes = window.jQuery('#metaboxes')
      const $form = window.jQuery(textarea.form)
      const tags = []
      $tagField.find('.tag-center span').each(function (item) {
        tags.push($(this).text())
      })

      if (tags.length) {
        window.jQuery('input.paramTags').remove(``)
        tags.forEach((val) => {
          $form.append(`<input type="hidden" class="paramTags" name="_tags[]" value="${val}">`)
        })
      }

      if ($metaboxes.length) {
        window.jquery('.__taxonomy-field input').each((idx, item) => {
          const $this = window.jQuery(item)
          const fieldName = $this.attr('name')
          const value = $this.val()

          if (!$metaboxes.find(`[name=${fieldName}]`).length) {
            $metaboxes.append(window.jQuery(`<input type="text" name="${fieldName}">`)).val(value)
          }

          $metaboxes.find(`[name=${fieldName}]`).val(value)
        })
      }

      return true
    })
  }
}

/**
 * Removes the default upload button from media blocks
 */
function removeUploadButton () {
  elementRendered('.components-form-file-upload button', element => element.remove())
}

/**
 * Removes some unnecessary elements from the editor
 */
function removeElements () {
  // Manage All Reusable blocks
  elementRendered('[href="edit.php?post_type=wp_block"]', element => { element.remove() })

  // Publish button
  elementRendered('.editor-post-publish-button', element => { element.style.display = 'none' })
  elementRendered('.editor-post-publish-panel__toggle', element => { element.style.display = 'none' })

  // Remove article button
  elementRendered('.editor-post-trash', element => { element.remove() })

  elementRendered('.editor-post-saved-state', element => { element.style.display = 'none' })

  elementRendered('.components-popover__content div .components-menu-group:last-of-type', element => { element.style.display = 'none' })
}
