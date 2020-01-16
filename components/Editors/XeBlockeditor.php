<?php
/**
 * XeBlockeditor
 *
 * PHP version 7
 *
 * @category    XeBlockeditor
 * @package     Xpressengine\Plugins\XeBlockeditor
 * @author      XE Developers <developers@xpressengine.com>
 * @copyright   2019 Copyright XEHub Corp. <https://www.xehub.io>
 * @license     http://www.gnu.org/licenses/lgpl-3.0-standalone.html LGPL
 * @link        https://xpressengine.io
 */

namespace Xpressengine\Plugins\XeBlockeditor\Components\Editors;

use Illuminate\Contracts\Routing\UrlGenerator;
use Xpressengine\Editor\AbstractEditor;
use Route;
use Xpressengine\Plugins\XeBlockeditor\plugin;
use Xpressengine\Plugin\PluginRegister;
use Xpressengine\Plugins\XeBlockeditor\XeBlockeditorPluginInterface;
use Illuminate\Contracts\Auth\Access\Gate;

/**
 * XeBlockeditor
 *
 * @category    XeBlockeditor
 * @package     Xpressengine\Plugins\XeBlockeditor
 * @author      XE Developers <developers@xpressengine.com>
 * @copyright   2019 Copyright XEHub Corp. <https://www.xehub.io>
 * @license     http://www.gnu.org/licenses/lgpl-3.0-standalone.html LGPL
 * @link        https://xpressengine.io
 */
class XeBlockeditor extends AbstractEditor
{
    protected static $loaded = false;

    /**
     * Get the evaluated contents of the object.
     *
     * @return string
     */
    public function render()
    {
        $this->initAssets();

        $script = <<<'DDD'
        <script>
            window.addEventListener('DOMContentLoaded', () => {
                Laraberg.init('xeContentEditor', {
                    laravelFilemanager: true,
                    sidear: true,
                    searchCb: null
                })
            })
        </script>
DDD;
        $content = '<div class="write_form_editor">';
        $content .= parent::render();
        $content .= '</div>';
        $content .= $script;

        $this->arguments['content'] = str_replace(['&lt;', '&gt;'], ['&amp;lt;', '&amp;gt;'], $this->arguments['content']);
        return $this->renderPlugins($content, $this->scriptOnly);
    }

    protected function renderPlugins($content, $scriptOnly)
    {
        // return $content;

        /** @var XeBlockeditorPluginInterface $plugin */
        foreach ($this->getPlugins() as $plugin) {
            $content = $plugin::render($content, $scriptOnly);
        }

        return $content;
    }

    protected function getPlugins()
    {
        return app('xe.pluginRegister')->get(self::getId() . PluginRegister::KEY_DELIMITER . 'plugin') ?: [];
    }

    /**
     * initAssets
     *
     * @return void
     */
    protected function initAssets()
    {
        if (self::$loaded === false) {
            self::$loaded = true;

            $this->frontend->js([
                'https://unpkg.com/react@16.8.6/umd/react.production.min.js',
                'https://unpkg.com/react-dom@16.8.6/umd/react-dom.production.min.js',
                plugin::asset('assets/xe-blockeditor.js')
            ])->load();

            $this->frontend->js([
                'assets/vendor/jQuery-File-Upload/js/vendor/jquery.ui.widget.js',
                'assets/vendor/jQuery-File-Upload/js/jquery.iframe-transport.js',
                'assets/vendor/jQuery-File-Upload/js/jquery.fileupload.js',
            ])->load();

            $this->frontend->css([
                plugin::asset('assets/xe-blockeditor.css')
            ])->load();

            $lang = require realpath(__DIR__.'/../../langs') . '/lang.php';

            $keywords = array_keys($lang);

            expose_route('media_library.index');
            expose_route('media_library.drop');
            expose_route('media_library.get_folder');
            expose_route('media_library.store_folder');
            expose_route('media_library.update_folder');
            expose_route('media_library.move_folder');
            expose_route('media_library.get_file');
            expose_route('media_library.update_file');
            expose_route('media_library.modify_file');
            expose_route('media_library.move_file');
            expose_route('media_library.upload');
            expose_route('media_library.download_file');

            $this->frontend->translation(array_map(function ($keyword) {
                return 'xe_blockeditor::' . $keyword;
            }, $keywords));
        }
    }

    /**
     * Get a editor name
     *
     * @return string
     */
    public function getName()
    {
        return 'xe_blockeditor';
    }

    /**
     * Determine if a editor html usable.
     *
     * @return boolean
     */
    public function htmlable()
    {
        return true;
    }

    /**
     * Compile content body
     *
     * @param string $content content
     * @return string
     */
    protected function compileBody($content)
    {
        $this->frontend->css([
            plugin::asset('assets/xe-blockeditor.css')
        ])->load();

        // @deprecated `.__xe_contents_compiler` https://github.com/xpressengine/xpressengine/issues/867
        return sprintf('<div class="__xe_contents_compiler gutenberg__content">%s</div>', $this->compilePlugins($content));
    }

    protected function compilePlugins($content)
    {
        /** @var XeBlockeditorPluginInterface $plugin */
        foreach ($this->getPlugins() as $plugin) {
            $content = $plugin::compile($content);
        }

        return $content;
    }
}
