# Data

## Data Layer

### robotSlice

- robot → object

```tsx
interface Robot {
name: string
image: string
speed: number
restistance: number
createdOn: string
_id: string (vendra de mongo)
}
```

- robots

```tsx
type Robots = Robot[];
```

### uiSlice

- isLoading: boolean
- modalIsOpen: boolean
- modalInformation

```tsx
{
isError: boolean,
modalInformation: string,
}
```

## Data modifications

### robotSlice

- loadRobots
  - cargarlas de la api
- loadRobot
  - cargar una de la api
- createRobot
  - añadir un robot nuevo
- updateRobot
  - modificar un robot
- deleteRobot
  - eliminar un robot

### uiSlice

- openLoader
- closeLoader
- openModal
- closeModal

### custom hook : useApi

- getAllRobotsApi
- getRobotByIdApi
- addRobotApi
- updateRobotApi
- deleteRobotApi

# Components

## App

### Show Data

- HomePage component if the path is “/” or “/home”
- FormPage component if the path is “/create-new-robot” or “/edit-robot”
- Loading component if isLoading is true
- Modal component if modalIsOpen is true

### Receive interactions

## HomePage

### Show Data

- Show a header component
- show a RobotList component

## FormPage

### Show Data

- Show a header component
- show a form component

## Header

### Show Data

- a heading level 1 with the text “Robotitos”
- a hamburger button on smaller screens
- a navigation component on larger screens

### Receive interactions

- open the navigation menu on click (hamburger)

## Navigation

### Show Data

- a link with the text “Home”
- a link with the text “New robot”

### Receive interactions

- navigate to /home on click
- navigate to /create-new-robot on click

## Button

### Show Data

- show the received text

### Receive interactions

- invoke the received function on click

## RobotList

### Show data

- a RobotCard component for each robot received

## RobotCard

### Show Data

- an image with the received image url and with the alt text of the received robot name
- a heading level 2 with the name of the received robot
- a button with the text edit/icon
- a button with the text delete/icon

### Receive interactions

- on hover show the speed, strength and creation date in front of the image
- navigate to the /edit-robot page on click
- delete the received robot on click

## Form

### Show Data

- a text input with label “Name:”
- a text input with label “Speed:”
- a text input with label “Strength:”
- a text input with label “Image URL:”
- a button with text Add Robot / Edit Robot

### Receive interactions

- on submit call addRobotApi with the form data and reset form

## Loading

### Show Data

- a loading animation

## Modal

### show data

- show received modal text
- show a success icon if received isError is false
- show an error icon if received isError is true
- show a button with text/icon close

### Received interactions

- close modal on click
