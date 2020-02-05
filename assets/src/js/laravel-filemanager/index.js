export default function (config) {
  const { hooks, element } = window.wp
  const { Component } = element

  class LaravelFilemanager extends Component {
    constructor (props) {
      super(props)
      this.state = {
        media: []
      }
    }

    getMediaType = (path) => {
      const video = ['mp4', 'm4v', 'mov', 'wmv', 'avi', 'mpg', 'ogv', '3gp', '3g2']
      const audio = ['mp3', 'm4a', 'ogg', 'wav']
      const extension = path.split('.').slice(-1).pop()
      if (video.includes(extension)) {
        return 'video'
      } else if (audio.includes(extension)) {
        return 'audio'
      } else {
        return 'image'
      }
    }

    onSelect = (url, path) => {
      this.props.value = null
      const { multiple, onSelect } = this.props
      const media = {
        url: url,
        type: this.getMediaType(path)
      }
      if (multiple) { this.state.media.push(media) }
      onSelect(multiple ? this.state.media : media)
    }

    openModal = () => {
      let type = 'file'
      if (this.props.allowedTypes.length === 1 && this.props.allowedTypes[0] === 'image') {
        type = 'image'
      }
      this.openLFM(type, this.onSelect)
    }

    openLFM = (type, cb) => {
      window.XE.app('MediaLibrary').then(function (appMediaLibrary) {
        appMediaLibrary.open({
          importMode: 'embed',
          listMode: 2,
          user: {
            id: window.XE.config.getters['user/id'],
            rating: window.XE.config.getters['user/rating']
          }
        })

        appMediaLibrary.$$on('media.import', function (eventName, mediaList, options) {

          // cb()
          $.each(mediaList, function () {
            cb(this.file.url, this.file.filename)
          })
        })
      })

      // 미디어 임포트 이벤트

      // let routePrefix = (config && config.prefix) ? config.prefix : '/laravel-filemanager'
      // window.open(routePrefix + '?type=' + type, 'FileManager', 'width=900,height=600')
      // window.SetUrl = cb
    }

    render () {
      const { render } = this.props
      return render({ open: this.openModal })
    }
  }

  hooks.addFilter(
    'editor.MediaUpload',
    'core/edit-post/components/media-upload/replace-media-upload',
    () => LaravelFilemanager
  )
}
