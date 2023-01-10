  Add the different types of shapes that can be added into the canvas
  Insert the stickers tab to allow people to put stickers and shapes from the database
  Insert the images tab to allow people to import images in
  Make sure you can somehow split the canvas into parts so that people can multiple pages at a time
  Do the finished touches on the image editor design


  Start working on the preview tab : 
    make a canvas that has a set of images that you can choose and switch from that puts the previewed image in a series of expected environments (fb feed, someone holding it in hand, dark restaurant environment etc.)
    Allow people to place the image in. Allow them to fix the lighting and other filters. Also some sort of data to determine if the image is any good
  Add the AI features like increase image resolution, create an image and fix images
  Do a "my profile" tab
  Do a "about us" page. Add it to the navbar somehow alongside Home
  Redo the design of the front page
  Fix that favicon
  Do the finishing touches


  NEED TO PRODUCE
  FRAMES & EDGES


  ADD PAGES PLAN:
  Add a button to add and remove page
  ON THE LAYOUT COMP : 
  add buttons to delete a layer, add a layer, choose an aspect ratio  and make an image a default bg for every layer

  Make a canvasPage redux state around canvasElems that will include all of the elemnts of that redux page. Then loop through each canvasPage and render a new canvas based on the elements that it has in it. MAKE SURE THE UNDO BUTTON WORKS. 

  // {
  //   pages : [
  //     0 : [{type : 'image', url: 'potato', size: 'tomato}, {type: 'text', font: 'potato', underline:' tomato'}, {type: 'shape', w: '150', h: '150'}],
  //     1 : [{type : 'image', url: 'potato', size: 'tomato}, {type: 'text', font: 'potato', underline:' tomato'}, {type: 'shape', w: '150', h: '150'}],
  //     2 : [{type : 'image', url: 'potato', size: 'tomato}, {type: 'text', font: 'potato', underline:' tomato'}, {type: 'shape', w: '150', h: '150'}],

  //   ]
  //   selected : {page: 0, element: 2}
  // }


  

  SMART PREVIEWS
    Where would someone need to see their restaurant photos:
    On phones, on a website, on a facebook banner / twitter banner / insta post / "website" 
    if it's a menu, in the hands of someone, on a table, evening and morning environments. 
    if it's an image / banner, on a wall, outside a restaurant entrance / evening / morning

    Changes based on size
    
    the person could use a contrast checker


    Device Screen Section :
      Phone
      fb, twi, insta
      Website
    Physical Section: 
      Inside and Outside section:
      In hand
      On a restaurant table,
      On a wall
      on an entrance 

      for the preview image section: 
      For each category there will be a background image guaranteed. The position of the image that will be previewed will be dynamic. Some elements will have other images ONTOP with DYNAMIC POSITIONS.
      Some images will have custom CSS

      1. Based on the currently selected value pull a specific template (object) and make it as the 'selected template'.
      2. Send this object to the previewImg component. Based on it the image will know where to place the previewed image alongside the other images that are in the background. They should all have a set w , h, x, and y alongside any necessary css


      PUT A LOGO IN THE PREVIEW TAB





de adaugat butonul de reset password
de adaugat butonul de crop
de pus bg-ul la sortingSidebar


      stylize la image editor 


      butonul de request custom design 
      bg la ruta graphic design si stock images
      de scos de la products request web design 
      bg la login 
      bg la reset password
      imagine atunci cand nu sunt rezultate