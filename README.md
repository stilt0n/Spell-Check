# Spell-Check
This is a command line spell checker based on Peter Norvig's spelling corrector.  You can find his version at norvig.com/spell-correct.html.
I wanted to try making the spelling corrector in using modern Javascript.  To run the spelling checker you'll need Node 12 and you'll need 
to run "npm install" to install the dependencies (just lodash).  The logic is all in SpellingCorrection.js and the command line interface
is in SpellCheck.js.  You can run the spell checker with "node SpellCheck.js arg0 arg1 ...".  

I haven't done anything to validate input, so you might have problems if you use non-letter characters.

## What I learned
I learned how to use a language corpus and Bayesian Statistics to correct spelling errors making this project. (note: this
particular spelling checker isn't exactly Bayesian because the error model just assumes each increase in edit distance is
infinitely less likely than the previous one.  You could make an error model with a spelling error corpus which Norvig talks
about on his site).

I also got a lot of practice doing array operations like map, filter and reduce.  Norvig's Python version uses a
whole lot of list comprehensions and so the major challenge was trying to be nearly as compact as his without being
able to use List Comprehensions.  This was also my first time using the Lodash library.
