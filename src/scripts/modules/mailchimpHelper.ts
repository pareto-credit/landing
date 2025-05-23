import { setTimeoutFramesAsync } from '@zajno/common/async/timeout';
import logger from 'scripts/logger';
import { loadScript, runScript } from 'scripts/utils/loadScript';

const URL = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';

let started = false;

export async function loadMailChimpValidators() {
    if (started) {
        return;
    }

    started = true;
    logger.log('MailChimp helper scripts loading start');

    setTimeoutFramesAsync();

    await loadScript(URL);

    runScript(`
    (function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='MMERGE1';ftypes[1]='imageurl';}(jQuery));var $mcj = jQuery.noConflict(true);
`);

    logger.log('MailChimp helper scripts has been loaded');
}
