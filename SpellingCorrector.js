/*This is a modern javascript version of norvig.com/spell-correct.html*/

const _ = require('lodash');
const fs = require('fs');

const getWords = text => [...text.matchAll(/\w+/g)];
//the words in big.txt and their frequency
const WORDS = _.countBy(getWords(fs.readFileSync('big.txt').toString().toLowerCase()));
//count number of words in big.txt
const N = Object.values(WORDS).reduce((acc, cur) => acc + cur);
//calculate the probability of the word
const P = word => (WORDS[word] ? WORDS[word] : 0) / N;
//find and return the candidate with the highest probability
const correction = word => candidates(word).reduce((best, cur) => best = P(cur) > P(best) ? cur : best, word);
//if word is known assume it's correct, otherwise check edits and then if no valid edits, assume word
const candidates = word => known([word]) || known(edits1(word)) || known(edits2(word)) || [word];
//check if the word exists in our language corpus
const known = words => {
	let k = words.filter(w => WORDS[w]);
	return k.length ? k : false;
}
//Edit operations --
const findSplits = word => {
	let s = [];
	for(let i = 0; i < word.length + 1; i++) {
		s.push([word.slice(0,i), word.slice(i)]);
	}
	return s;
}

const findReplaces = (splits, letters) => {
	let r = []
	for (let s of splits) {
		if(s[1]) {
			for(let l of letters) {
				r.push(s[0] + l + s[1].slice(1));
			}
		}
	}
	return r;
}

const findInserts = (splits, letters) => {
	let i = [];
	for(let s of splits) {
		for(let l of letters) {
			i.push(s[0] + l + s[1]);
		}
	}
	return i;
}
//--
//return all possible edits of distance one
const edits1 = word => {
	const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
	let splits = findSplits(word);
	let deletes = splits.filter(s => s[1]).map(s => s[0] + s[1].slice(1));
	let transposes = splits.filter(s => s[1].length > 1).map(s => s[0] + s[1][1] + s[1][0] + s[1].slice(2));
	let replaces = findReplaces(splits, letters);
	let inserts = findInserts(splits, letters);
	return [...deletes, ...transposes, ...replaces, ...inserts];
}
//all possible edits of distance two
const edits2 = word => _.flatten(edits1(word).map(w => edits1(w)));

module.exports = correction;