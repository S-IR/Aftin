import { UpdateCookiesObj } from "../../lib/gtag"



interface cookiesConsentOption  {
  name: string,
  description : string, 
  id: keyof UpdateCookiesObj
}
export const cookiesConsentOptions: cookiesConsentOption[] = [
  {name: 'Functionality Cookies',
  description: "TO BE FILLED IN",
  id: 'functionality_storage'
  },
  {name: 'Personalization Storage',
  description: "TO BE FILLED IN",
  id: 'personalization_storage'
  },
  {name: 'Analytics Cookies ',
  description: "TO BE FILLED IN",
  id: 'analytics_storage'
  },
  {name: 'Targeting Cookies ',
  description: "TO BE FILLED IN",
  id: 'ad_storage'
  },
]