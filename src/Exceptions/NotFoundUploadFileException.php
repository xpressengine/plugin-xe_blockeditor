<?php
/**
 * NotFoundUploadFileException
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

namespace Xpressengine\Plugins\Blockeditor\Exceptions;

use Xpressengine\Plugins\Blockeditor\BlockeditorException;

/**
 * NotFoundUploadFileException
 *
 * @category    Blockeditor
 * @package     Xpressengine\Plugins\Blockeditor
 * @author      XE Developers <developers@xpressengine.com>
 * @copyright   2019 Copyright XEHub Corp. <https://www.xehub.io>
 * @license     http://www.gnu.org/licenses/lgpl-3.0-standalone.html LGPL
 * @link        https://xpressengine.io
 */
class NotFoundUploadFileException extends BlockeditorException
{
    protected $message = 'Upload file cannot be found.';
}
