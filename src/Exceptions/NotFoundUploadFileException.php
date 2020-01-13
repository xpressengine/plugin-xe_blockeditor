<?php
/**
 * NotFoundUploadFileException
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

namespace Xpressengine\Plugins\XeBlockeditor\Exceptions;

use Xpressengine\Plugins\XeBlockeditor\XeBlockeditorException;

/**
 * NotFoundUploadFileException
 *
 * @category    XeBlockeditor
 * @package     Xpressengine\Plugins\XeBlockeditor
 * @author      XE Developers <developers@xpressengine.com>
 * @copyright   2019 Copyright XEHub Corp. <https://www.xehub.io>
 * @license     http://www.gnu.org/licenses/lgpl-3.0-standalone.html LGPL
 * @link        https://xpressengine.io
 */
class NotFoundUploadFileException extends XeBlockeditorException
{
    protected $message = 'Upload file cannot be found.';
}
