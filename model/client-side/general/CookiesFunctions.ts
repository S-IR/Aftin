import Cookies from "js-cookie";

export const initializeCookieConsent = () => {
  const functionality_storage_value = Cookies.get(`functionality_storage`);
  const security_storage_value = Cookies.get(`security_storage`);
  const analytics_storage_value = Cookies.get(`analytics_storage`);
  const ad_storage_value = Cookies.get(`ad_storage`);

  window.gtag("consent", "update", {
    functionality_storage: functionality_storage_value,
    security_storage: security_storage_value,
    analytics_storage: analytics_storage_value,
    ad_storage: ad_storage_value,
  });
};
