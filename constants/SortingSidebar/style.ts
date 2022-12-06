import { string } from "yup"
import { gr_des_style_array } from "../../typings/image-types/ImageTypes"
import { SortOption } from "../../typings/image-types/sortTypes"

 const grDesStyleOptions: SortOption[] = [
  {name: 'Diners', imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/diner.png', value: `diner`},
  {name: 'Fine Dining', imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/fine-dining.png', value: `fine-dining`},
  {name: 'Bars', imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/bar.png', value: `bar`},
  {name: 'Cafeterias', imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/cafeteria.png', value:`cafeteria`},
  {name: 'Family Restaurant', imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/family-restaurant.png', value:  `family-restaurant`},
  {name: 'Pizzeria', imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/pizzeria.png', value:  `pizzeria`},
  {name: `Ethnic`, imgSrc: null, value: 
    [
      {name: `Italian`, imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/Ethnic/italian.png', value: `italian` },
      {name: `Japanese`, imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/Ethnic/japanese.png', value: `japanese`},
      {name: `French`, imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/Ethnic/french.png', value: `french` },
      {name: `Indian`, imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/Ethnic/indian.png', value: `indian` },
      {name: `Greek`, imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/Ethnic/greek.png', value: `greek` },
      {name: `thai`, imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/Ethnic/thai.png', value: `thai` },
      {name: `Mexican`, imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/Ethnic/mexican.png', value: `mexican` },
      {name: `chinese`, imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/Ethnic/chinese.png', value: `chinese` },
      {name: `Middle Eastern`, imgSrc: '/frontend-used-images/SortingSidebar/Graphic Design Styles/Ethnic/middle-eastern.png', value: `middle eastern`}  
    ]

  }



]

export default grDesStyleOptions