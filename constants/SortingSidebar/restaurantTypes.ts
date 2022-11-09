export type restaurantType = {restaurantType: string, imgSrc: `/${string}` | null} | {restaurantType: 'Ethnic', Ethnic_Types: {name: string, imgSrc:`/${string}` | null}[]}

export const restaurantTypes: restaurantType[] = [
  {restaurantType: 'Not Specified', imgSrc: null},
  {restaurantType: 'Fine dining', imgSrc: '/frontend-used-images/SortingSidebar/Fine-dining'},
  {restaurantType: 'Casual Dining', imgSrc: '/frontend-used-images/SortingSidebar/Casual-Dining'},
  {restaurantType: 'Bar & Nightclubs', imgSrc: '/frontend-used-images/SortingSidebar/Bar&Nightclubs'},
  {restaurantType: 'Hotel Restaurants', imgSrc: '/frontend-used-images/SortingSidebar/Hotel-Restaurants'},
  {restaurantType: 'Café', imgSrc: '/frontend-used-images/SortingSidebar/Café'},
  // {restaurantType: 'Ethnic', Ethnic_Types:[
  //   {name: 'Italian', imgSrc:'/frontend-used-images/SortingSidebar/Italian'},
  //   {name: 'Mexican', imgSrc:'/frontend-used-images/SortingSidebar/Mexican'},
  //   {name: 'Chinese', imgSrc:'/frontend-used-images/SortingSidebar/Chinese'},
  //   {name: 'Thai', imgSrc:'/frontend-used-images/SortingSidebar/Thai'},
  //   {name: 'Indian', imgSrc:'/frontend-used-images/SortingSidebar/Indian'},
  //   {name: 'Korean', imgSrc:'/frontend-used-images/SortingSidebar/Korean'},
  //   {name: 'Greek', imgSrc:'/frontend-used-images/SortingSidebar/Greek'},
  //   {name: 'Other', imgSrc: null},
  // ]},

]