import { editorSettings, overridePost } from './settings'
import { configureAPI } from '../api/api-fetch'
import configureEditor from '../lib/configure-editor'
import { elementReady } from '../lib/element-ready'

const { registerPlugin } = window.wp.plugins
const { blocks, data, domReady, editPost } = window.wp
const { unregisterBlockType, registerBlockType, getBlockType } = blocks

/**
* Initialize the Gutenberg editor
* @param {string} target the element ID to render the gutenberg editor in
*/
export default function init (target, options = {}) {
  configureAPI(options)

  // Disable publish sidebar
  data.dispatch('core/editor').disablePublishSidebar()

  window._wpLoadGutenbergEditor = new Promise(function (resolve) {
    domReady(async () => {
      const larabergEditor = createEditorElement(target)
      try {
        window.wp.date.setSettings({ l10n: { locale: 'ko_KR', months: ['1\uc6d4', '2\uc6d4', '3\uc6d4', '4\uc6d4', '5\uc6d4', '6\uc6d4', '7\uc6d4', '8\uc6d4', '9\uc6d4', '10\uc6d4', '11\uc6d4', '12\uc6d4'], monthsShort: ['1\uc6d4', '2\uc6d4', '3\uc6d4', '4\uc6d4', '5\uc6d4', '6\uc6d4', '7\uc6d4', '8\uc6d4', '9\uc6d4', '10\uc6d4', '11\uc6d4', '12\uc6d4'], weekdays: ['\uc77c\uc694\uc77c', '\uc6d4\uc694\uc77c', '\ud654\uc694\uc77c', '\uc218\uc694\uc77c', '\ubaa9\uc694\uc77c', '\uae08\uc694\uc77c', '\ud1a0\uc694\uc77c'], weekdaysShort: ['\uc77c', '\uc6d4', '\ud654', '\uc218', '\ubaa9', '\uae08', '\ud1a0'], meridiem: { am: '\uc624\uc804', pm: '\uc624\ud6c4', AM: '\uc624\uc804', PM: '\uc624\ud6c4' }, relative: { future: '\uc9c0\uae08\ubd80\ud130 %s', past: '%s \uc804' } }, formats: { time: 'g:i a', date: 'Y\ub144 F j\uc77c', datetime: 'Y\ub144 F j\uc77c g:i a', datetimeAbbreviated: 'M j, Y g:i a' }, timezone: { offset: 9, string: 'Asia\/Seoul' } })
        resolve(editPost.initializeEditor(larabergEditor.id, 'page', 1, editorSettings, overridePost))
        fixReusableBlocks()
      } catch (error) {
        console.error(error)
      }
      await elementReady('.edit-post-layout')
      configureEditor(options)
      window.wp.data.dispatch('core/editor').editPost({
        title: window.XE._.get(options, 'title', ''),
        date: window.XE._.get(options, 'publishedAt', null)
      })
    })
  })
}

/**
* Creates the element to render the Gutenberg editor inside of
* @param {string} target the id of the textarea to render the Editor instead of
* @return {element}
*/
function createEditorElement (target) {
  const element = document.getElementById(target)
  const editor = document.createElement('DIV')
  editor.id = 'xe-blockeditor__editor'
  editor.classList.add('xe-blockeditor__editor', 'gutenberg__editor', 'block-editor__container', 'wp-embed-responsive')
  element.parentNode.insertBefore(editor, element)
  element.hidden = true

  editorSettings.target = target
  window.Laraberg.editor = editor

  return editor
}

function fixReusableBlocks () {
  const coreBlock = getBlockType('core/block')
  unregisterBlockType('core/block')
  coreBlock.attributes = {
    ref: {
      type: 'number'
    }
  }
  registerBlockType('core/block', coreBlock)
}

const {
  PostScheduleLabel
} = window.wp.editor
const { PluginPostStatusInfo } = window.wp.editPost
const { PanelRow, Dropdown, Button, DateTimePicker } = window.wp.components
const { compose } = window.wp.compose
const { __experimentalGetSettings } = window.wp.date
const { withSelect, withDispatch } = window.wp.data
const { createElement } = window.wp.element

export function PostSchedule (_ref) {
  var date = _ref.date
  var onUpdateDate = _ref.onUpdateDate

  var settings = __experimentalGetSettings() // To know if the current timezone is a 12 hour time with look for "a" in the time format
  // We also make sure this a is not escaped by a "/"

  var is12HourTime = /a(?!\\)/i.test(settings.formats.time.toLowerCase() // Test only the lower case a
    .replace(/\\\\/g, '') // Replace "//" with empty strings
    .split('').reverse().join('') // Reverse the string and test for "a" not followed by a slash
  )
  return createElement(DateTimePicker, {
    key: 'date-time-picker',
    currentDate: date,
    onChange: onUpdateDate,
    is12Hour: is12HourTime
  })
}
const Picker = compose([withSelect(function (select) {
  return {
    date: select('core/editor').getEditedPostAttribute('date')
  }
}), withDispatch(function (dispatch) {
  return {
    onUpdateDate: function onUpdateDate (date) {
      dispatch('core/editor').editPost({
        date: date
      })
      const momentDate = window.XE.moment(date)
      if (momentDate.isValid()) {
        window.$('#metaboxes [name=published_at]').val(momentDate.format('YYYY-MM-DD HH:mm:ss'))
      }
    }
  }
})])(PostSchedule)

const PostScheduleRow = function () {
  return (
    <PluginPostStatusInfo>
      <PanelRow className='edit-post-post-schedule'>
        <span>발행시각</span>
        <Dropdown
          position='bottom left'
          contentClassName='edit-post-post-schedule__dialog'
          renderToggle={({ onToggle, isOpen }) => (
            <>
              <Button
                className='edit-post-post-schedule__toggle'
                onClick={onToggle}
                aria-expanded={isOpen}
                isLink
              >
                <PostScheduleLabel />
              </Button>
            </>
          )}
          renderContent={() => <Picker />}
        />
      </PanelRow>
    </PluginPostStatusInfo>
  )
}

registerPlugin('post-status-info-test', { render: PostScheduleRow })
