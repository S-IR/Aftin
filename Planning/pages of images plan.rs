When a user enters an url (such as '/fastfoods/pizzas') he will need to send a request to the firestore database with the end portion of that url. Then firebase will send the proper images to show.
The user will then first get a popup if he did not set his brand design (small, on the right side). That will make him go through a small amount of modal poppups where he will choose what kind of brand he is to better display what he needs\
All of the firebase requests will contain this cookie. They will filter images based on that request and send the ones that are similar first.
15 images will be shown at first. The user will have a button to show more. He will also have a general filter for those images, such as "pizzas on a beach, photos with mascots etc."


Things to do :
1. learn how getServerSideProps works, how you can get data from the url, how you can input things as data into the url and use that data to fetch.
1.1 Do the filters tab
the index sends an array of the needed filters with their options on null
the filters do a boolean check to see what to display, if it finds a property to display it displays it. It has access to the state and to the set state of the sorting array. Each object has the name and optionally an icon next to it to be displayed.
The image component only has access to the state of the sorting array. It does the filtering.
FILTERS:
colors :
Not Specified

"black", "white", "gray", "silver", "maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua"

restaurant type:
Not Specified
Fine dining
Diner
Bar
Fast food
Casual dining
Cafes
Pizzeria
Family style
Ethic : italian, japanese, french, indian, greek, thai, mexican, chinese, other, middle eastern

Types of images : Hunger inducing, Artistic, Youthful, Professional, Classical, Exotic 



2. Learn how firebase works with fetching, specifically how you fetch, how you filter and how you can send other data from cookies for it to read
2.1 Make the modal popups to put the cookies in. :
Types of colors he would like to see :
  just let him choose 5 colors and use general templates    


3.Get the sorted images that were requested back to the server.
3.1 filter those images based on the clients decision
4. make a loading screen while waiting for the images
5. Display only 15 images. If the user clicks on more he will be shown more.
7.


WHAT NEEDS TO GO WHERE: 
The filters need to know :
which sort is selected
how to change selection


the image part needs to know:
which sort is selected



SORTING FOR IMAGES:
GENERAL:
Color scheme
description

SPECIFIC: 
for Stock images {
  surrounding environment
  for main dishes{
    type of dish{ 
      check the dishes in that folder
    }
  }
  for sweets{
    type of sweet {

      
    }

  }
  for fast foods {
    fries,
    burgers,
    tacos,
    pizzas,
    nuggets,
    pretzel
  }
  for drinks{
    beer
    carbonated drinks
    cocktails
    coffee
    hard alcohol
    juices
    tea
    water
    wine
  }
  for utensils{
    baking tools
    forks
    knives
    ladle
    spatula
    spoons
    vessels
    whisks
  }
  wooden? stainless steel
  for ingredients{
    for spices{
      black pepper
      cardamom
      cinnamon
      coriander
     	masala
      nutmeg
      saffron
      zaatar
    }
    for fruits{
      mango
      grapes
      strawberry
      pineapple
      watermellon
      apple
      grapes
      oranges
      berries
      nuts

    }
    for vegetables{
      tomatoes
      carrots
      peas
      cucumbers
      cabbage
      broccoli
      beans
      onion
      garlic

    }
    flour
    syrup

}

for graphic design{
  mascots
  for menus{
    shape
  }
  banners (won't have sizes but will have):{
    for facebook, on websites, outdoors (big sizes)
  }
  for logos (won't have mascots but will have) {
    type {
      text
      food 
      utensils & plates
      mascots      
    }
  }
  for artworks{
    style{
      eye catchy
      hunger inducing
      painting
      cartoon
      nostalgic
      creative
      unique
    }
  }
  for stickers{
    pizza
    popcorn
    bread
    burger
    cheese
    taco
    vetables
    ice cream
    hot dog
    donut
    milk
  }
  for brochures{
    shape
  }
  for flyers{
    same as brochures
  }
}

what needs to go where: 
the component needs to know which type of image you want to upload
based on that it should add an input for each added category that should be uploaded

some categories will be the same, which means that their input will be the same

they will take the category and the subcategory's name and will upload the image there.
then they will do the same for uploading a doc

they will display the inputs based on what it has been sent down to them. An array will be sent down containing each category that will be required. The component will loop through each string in the array displaying an option based on that. If in the array there is an object it will take the object's values and make them options to be selected



how the filter system will work :
based on the category that the person chose, some filters will appear on the right side. Those will be the same as the fields which the uploaded images has, except description, url (and views at the start)
When clicked they will insert in the upper side of the link their sort values.
The component will have access to every single document of every single image that has been displayed. It will only filter them when the link changes. 