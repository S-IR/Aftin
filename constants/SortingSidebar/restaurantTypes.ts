export type restaurantType =
  | { restaurantType: string; imgSrc: `/${string}` | null }
  | {
      restaurantType: "Ethnic";
      Ethnic_Types: { name: string; imgSrc: `/${string}` | null }[];
    };

export const restaurantTypes: restaurantType[] = [
  { restaurantType: "Not Specified", imgSrc: null },
  { restaurantType: "Fine dining", imgSrc: "/SortingSidebar/Fine-dining" },
  { restaurantType: "Casual Dining", imgSrc: "/SortingSidebar/Casual-Dining" },
  {
    restaurantType: "Bar & Nightclubs",
    imgSrc: "/SortingSidebar/Bar&Nightclubs",
  },
  {
    restaurantType: "Hotel Restaurants",
    imgSrc: "/SortingSidebar/Hotel-Restaurants",
  },
  { restaurantType: "Café", imgSrc: "/SortingSidebar/Café" },
  // {restaurantType: 'Ethnic', Ethnic_Types:[
  //   {name: 'Italian', imgSrc:'/SortingSidebar/Italian'},
  //   {name: 'Mexican', imgSrc:'/SortingSidebar/Mexican'},
  //   {name: 'Chinese', imgSrc:'/SortingSidebar/Chinese'},
  //   {name: 'Thai', imgSrc:'/SortingSidebar/Thai'},
  //   {name: 'Indian', imgSrc:'/SortingSidebar/Indian'},
  //   {name: 'Korean', imgSrc:'/SortingSidebar/Korean'},
  //   {name: 'Greek', imgSrc:'/SortingSidebar/Greek'},
  //   {name: 'Other', imgSrc: null},
  // ]},
];
