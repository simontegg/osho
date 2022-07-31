# OSHO challenge

## Framework and approach

I chose Solid JS as the framework and builts on a Solid JS template, with vite for the build system and testing, and tailwind for the styles. 

Solid JS is a 'React-like' framework that looks similar to React, but with different conceptual foundations (no virtual DOM, "fine-grained reactivity") and good performance. 
I chose Solid JS because mostly because I wanted to try something new, and also because the challenge required animating a wheel and Solid JS is a reasonable choice for animations. 

The two screens are implemented  with the Solid JS Router.


## State management

The challenge required the state should ideally persist between application launches. 
I decided to store application state in the url params. This meets requirements but avoids a server and database. The persisted state only needs to be a list of options and the rotation of the wheel so this was feasible. 

Calculating the winning option was pretty challenging with a algebraic approach. So instead I took a more 'brute force' approach and detected the most rightward label. This ended up only being 10 LOC, so perhaps less satisfying from a mathematical approach but it got the job done.


## UX Considerations

The design was a little light, so added several adjustments to improve the UX:
 - An "Edit" button to get back to the Input page.
 - A way to delete an option.
 - A way to add an option.
 - A maximum of 10 options and a minimum of 2 (enforced by removing add/delete functionality).
 - Error detection for blank and duplicate options. Navigation disabled until these were fixed (with warning).
 - Labelling the options on the wheel.
 - Distinct colours on the wheel for each option.
 - Reporting the winning option.
 - Placing the "Edit" and "Done" buttons in the same position on the screen.
 - A nice easing function to give the animation a more realistic feel. 
 - Using Tailwind buttons and inputs. 
 - Focusing the input of a newly added option




