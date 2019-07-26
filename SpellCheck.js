/*Command line interface for the spelling corrector*/

console.log("This spelling corrector is a Javascript adaptation of Peter Norvig's.\n"
	+ "You can find the original version at norvig.com/spell-correct.html");
const args = process.argv.slice(2);
if(args.length) {
	const check = require('./SpellingCorrector.js');
	args.forEach(arg => console.log(`\nOriginal: ${arg} | Corrected: ${check(arg)}`));
} else {
	console.log('To use the spelling checker, input the words you want'
		+' to check\nas command line args. (i.e node SpellCheck.js arg0 arg1 ...)');
}