import moment from 'moment';
/**
 * Check if a campaign is currently active
 * @param campaign - the campaign model
 * @returns true if the campaign is active
 */ export function isCampaignActive({ startDate, endDate }) {
    if (startDate && endDate) {
        return moment().isBetween(moment(startDate), moment(endDate));
    }
    if (startDate) {
        return moment().isAfter(moment(startDate));
    }
    if (endDate) {
        return moment().isBefore(moment(endDate));
    }
    return true;
}

//# sourceMappingURL=campaign.lib.js.map