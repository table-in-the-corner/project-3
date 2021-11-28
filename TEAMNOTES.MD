# Team notes
This is for maintaining communication about your team's working meetings to "ship" the project.

## Meeting notes
These are notes to be maintained PER date that you meet. What you did and what the next steps are
### Meeting Date

#### What we did:


#### What we'll do next

### Meeting 11/11
#### What we did:
- created sortable options boxes to begin working with for sorting
- began dividing up work to be done
- discussed how we wanted to accomplish the project i.e. use scaffolding, wrapping, etc.
#### What we'll do next
- begin working on sorting
- once sorting method is determined, we can begin working on how we want to approach the checking and answers features


## Status check ins
These are dedicated status check-ins as this is a multi-week project
### Check-in 1
- Discussed our assignment and design requirements online on 11/7
  - Next steps will be to begin to divide elements and decide on the design of the component
- Sorting Question: https://github.com/elmsln/issues/issues/872
-  ![IMG_1688](https://user-images.githubusercontent.com/89546413/140660308-9ca3b50d-c107-4a48-8b9c-593fc304012f.jpeg)
- Initial questions/unknowns
  -   animations?
  -   dragging from point a to point b
- What elements do you expect are needed for this design?
  - check button
  - show solutions button
  - retry button
  - individual components for each answer/section to be sorted
  - buttons to use for toggling the section up or down
  - Sorting Options Frame
- What properties do you expect these to have?
  - Retry Button
    - Disabled
  - Sortable Option
    - Disabled
    - Selected
    - Correct Index
    - Current Index
    - Option Text
    - Selected/Focused
  - Sortable Array
    - Sorted (Boolean)
- Slots?
  - Each sortable option will need to be slotted into the Sortable Options Frame depending on the question asked.
  - Text will be slotted into each sortable option
- What CSS/Styling unknowns are there presently?
  - Not an unknown, but figuring out logic for adding a correct/incorrect border via reflected properties
  - Handling the "swap" animation when options are switched with one another
- What states does it have? Can you click/hover to engage with it?
  - correct and incorrect state for checking
  - disabled state when giving solutions and checking
  - Drag state of each sortable option
- What properties need mapped to HAX/the storybook? What can the user interact with?
  - We will need to map properties such as disabled buttons & options, the option text (or question selected depending on our implementation), correct/incorrect state, question/option themes if we choose to support themes.
  - The user should be able to use the up and down arrows, click to move, or drag each section to sort.
  - The user should be able to check their answers.
  - The user should be able to view correct answers.
  - The user should be able to retry the problem having it reset back to its original state.
### Check-in 2
- Meetings
  - Met online and messaged largely over text working through logic questions and when discussing design options.
- Progress Made:
  - began working on Sortable and SortableOption elements
  - created basic sortable option boxes to begin working on functionality 
  - Basic UI Sorting/dragging interaction implementation (still testing)
- Anticipated Delegation of Work:
  - Nick: Logic for interactions and SortableFrame
  - Bailey: SortableOption and Storyboard
  - Noelle: Checking and Answers features
  - Nicole: Tests, Checking and Answers fetures
- Questions/Problems
  - Running into a UI sorting issue where we cannot drop the same row twice in a dropzone. Could this be an id-related issue or something different?
### Check-in 3
- Meetings:
  - Messaged largely over text due to being home for break 
- Progress Made:
   - Worked on rendering options
   - Added the feature to select different questions
   - Made progress on the drag functionality
   - Created the scoring feature
- Insight Gained from issues:
  - Learned we need to switch to dynmaic option rendering
  - Re-do and think the logic behind dragging and look into recommendations
  - Slots may be useful when working with question elements
- Next Steps:
   -  Continue working on the Storyboard, tests, and logic
 
### Check-in 4
- 
- 
