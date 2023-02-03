import { ConsentCookiesObs } from "../../lib/gtag"



interface cookiesConsentOption  {
  name: string,
  description : string, 
  id: keyof ConsentCookiesObs
}
export const cookiesConsentOptions: cookiesConsentOption[] = [
  {name: 'Essential / Functionality Cookies',
  description: "These Cookies are essential to provide You with services available through the website and to enable you to use some of its features.",
  id: 'functionality_storage'
  },
  {name: 'Security Cookies',
  description: "These Cookies are related to security such as authentication storage, fraud prevention and other user protection. They ensure that only the actual owner of the account can access that account.",
  id: 'security_storage'
  },
  {name: 'Analytics Cookies ',
  description: "These cookies track your activity on our website and we use them to improve our product by analyzing our traffic",
  id: 'analytics_storage'
  },
  {name: 'Targeting Cookies ',
  description: " Google and other Third Party Vendors use cookies to serve ads based on a user's prior visits to the website or other websites. They allow Google and its partners to serve you ads based on your visits on the Website and/or other sites on ",
  id: 'ad_storage'
  },
]