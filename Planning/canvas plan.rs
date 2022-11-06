1. Get a document where all of the elements in the canvas are saved with their most important data
The template for it is [type: <the type of the element>, data:<the data of the element>]

for images:  width, height, filters, x, y V
text: width, height, filters, x, ,y, text, font, font size, font styleV
other shapes:  width, height, filters,x, y V

This document should include all of the previous states that the image was in. If the document is sent by the server(in other words the person is editing a template) it should start at 0 


2. Save another redux state with the currently selected element V

3. Make redux functions to add a new element for each of these categories V

4. Send the document, split it into its individual components and send the components their required data V
5.send isSelected toggle and let them modify their data V
6. make the undo/redo buttons. If the array is to big, cut the thingy V


FOR THE MODIFY


CANVAS BUTTONS :
1. center the canvas when uploaded V
1.1 remove all of the unnecessary code of states being sent down V
1.2 Refactor the redux reducers into text, image and shapes V
1.3 MAKE THE SHAPES COMPONENT  V
1.4. make an AI assistance tab. if the person is not subscribed make it grayed out with a question mark sign next to it that explains on hover what it is
1.5 make a styles tab. The styles choice will be stored in local storage. It will display relevant iamges and text fonts based on the choice of the person. It will also display images from a  specific color palette that's chosen by the person 
2. make a component for each type of element of canvas with buttons corresponding to its settings
3. make a find function where you find the selected element, if the selected element is of type X, display type X component with the data being send down from the canvas

For the image component :
Delete button
stroke (color) input
stroke width input
width input
height input

fpr the text component :
Delete button
font size input
font family input
font variant input
stroke (color) input
stroke width input

for the shapes button:
fill color (can be gradient)
border color
border width
Fill pattern image


Element properties:

1. do the shape properties UI and the crop and the filters for the images V
1.1 make the text outline when clicked


2. do the handlers to change each of the properties of the elements



4. Put each image in these types of categories

5. MAKE THe undo and redo happen with ctrl z and ctrl y
