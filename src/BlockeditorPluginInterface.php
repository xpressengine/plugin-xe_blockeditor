<?php
/**
 * Blockeditor
 *
 * PHP version 7
 *
 * @category    Blockeditor
 * @package     Xpressengine\Plugins\Blockeditor
 * @author      XE Developers <developers@xpressengine.com>
 * @copyright   2019 Copyright XEHub Corp. <https://www.xehub.io>
 * @license     http://www.gnu.org/licenses/lgpl-3.0-standalone.html LGPL
 * @link        https://xpressengine.io
 */

namespace Xpressengine\Plugins\Blockeditor;

/**
 * BlockeditorPluginInterface
 *
 * Blockeditor 모듈에 plugin 을 등록하려면 이 interface 를 사용하세요.
 *
 * @category    Blockeditor
 * @package     Xpressengine\Plugins\Blockeditor
 * @author      XE Developers <developers@xpressengine.com>
 * @copyright   2019 Copyright XEHub Corp. <https://www.xehub.io>
 * @license     http://www.gnu.org/licenses/lgpl-3.0-standalone.html LGPL
 * @link        https://xpressengine.io
 */
interface BlockeditorPluginInterface
{
    public static function render($content, $scriptOnly = false);

    public static function compile($content);
}
