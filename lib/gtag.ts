import Cookies from "js-cookie";

export interface UpdateCookiesObj {
  'ad_storage'?: 'denied'| 'granted',
  'analytics_storage'?: 'denied' | 'granted',
  'functionality_storage'? : 'denied' | 'granted',
  'personalization_storage'? : 'denied' | 'granted',
  'security_storage'? : 'denied' | 'granted'
}


export const GA_TRACKING_ID = `G-BTF883FE0C`
 
export const pageview = (url :string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
 
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};

/**
 *  Accepts all of the non-essential cookies. Places browser cookies to keep track of this acceptance
 */
export const acceptAllCookies = () => {
  Cookies.set('ad_storage_consent', 'granted', { expires: 365 })
  Cookies.set('analytics_storage_consent', 'granted', { expires: 365 })
  window.gtag('consent', 'update', {
    'ad_storage': 'granted',
    'analytics_storage': 'granted'
  });

}
/**
 * Rejects all of the non-essential cookies. Places browser cookies to keep track of the rejection for the future
 */
export const rejectAllCookies = () => {
  Cookies.set('ad_storage_consent', 'denied', { expires: 365 })
  Cookies.set('analytics_storage_consent', 'denied', { expires: 365 })
  window.gtag('consent', 'update', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied'
  });
}

export const updateCookies = (updateCookieObj: UpdateCookiesObj) => {
  for (const key in updateCookieObj){
    Cookies.set(`${key}`, `${updateCookieObj[key]}`, {expires: 365})
  }
  window.gtag('consent', 'update', updateCookieObj)
}