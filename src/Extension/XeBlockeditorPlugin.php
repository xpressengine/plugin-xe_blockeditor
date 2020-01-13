<?php
/**
 * XeBlockeditorPlugin
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

namespace Xpressengine\Plugins\XeBlockeditor\Extension;

use XeFrontend;
use Xpressengine\Plugin\AbstractComponent;
use Xpressengine\Plugins\XeBlockeditor\XeBlockeditorPluginInterface;

/**
 * XeBlockeditorPlugin
 *
 * @category    XeBlockeditor
 * @package     Xpressengine\Plugins\XeBlockeditor
 * @author      XE Developers <developers@xpressengine.com>
 * @copyright   2019 Copyright XEHub Corp. <https://www.xehub.io>
 * @license     http://www.gnu.org/licenses/lgpl-3.0-standalone.html LGPL
 * @link        https://xpressengine.io
 */
class XeBlockeditorPlugin extends AbstractComponent implements XeBlockeditorPluginInterface
{
    protected static $loaded = false;

    public static function render($content, $scriptOnly = false)
    {
        return $content;
    }

    public static function compile($content)
    {
        static::initAssetsForCompile();

        return $content;
    }

    private static function initAssetsForCompile()
    {
        if (self::$loaded === false) {
            self::$loaded = true;

            $path = str_replace(base_path(), '', realpath(__DIR__ . '/../../assets'));
        }
    }
}
