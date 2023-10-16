export interface userData {
  timezone: string;
  dateFormat: string;
  timeFormat: string;
}

/**
 * Normalize Data from TagoIO to the EChart format
 * @param tagoData
 * @returns
 */
function parseUserSettings(userParams: any): userData {
  const userInfo: userData = { timezone: "America/New_York", dateFormat: "MM/DD/YYYY", timeFormat: "12" };

  if (userParams) {
    if (userParams.timezone) {
      userInfo.timezone = userParams.timezone;
    }
    if (userParams.options?.date_format) {
      userInfo.dateFormat = userParams.options.date_format;
    }
    if (userParams.options?.time_format) {
      userInfo.timeFormat = userParams.options.time_format;
    }
  }

  userInfo.dateFormat = userInfo.dateFormat.replace("YYYY", "yyyy").replace("DD", "dd");
  userInfo.timeFormat = userInfo.timeFormat.replace("12", "hh:mm a").replace("24", "HH:mm");

  console.log(userInfo);

  return userInfo;
}

export { parseUserSettings };
