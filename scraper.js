var google = require('google')

google.resultsPerPage = 1
const nextCounter = 0
const pages = 4;
const question = 'Michal jordans middle name';
const answers = ['jeffrey', 'bob', 'bil'];

async function whichAnswerHasMostResults() {
}

function occurrences(str, subString, allowOverlapping) {
    var re = new RegExp(subString, 'gi');
    return str.match(re) ? str.match(re).length : 0;
}
async function whichAnswerShowsUpMost(pagesToSearch) {
	google.resultsPerPage = pagesToSearch;
	const resultsPerAnswer = await Promise.all(
		answers.map(async a => {
			return new Promise((f, r) => {
				google(question, function (err, res){
					console.log('a', a);
				  if (err) console.error(err);
					var count = res.links.reduce((sum, l) => {
						return sum + occurrences(l.description, a, false);
					}, 0);

					console.log(count);
				  f(count);
				});
			})
			
		})
	);
	console.log('resultsPerAnswer', resultsPerAnswer);
	return resultsPerAnswer.indexOf(Math.max(...resultsPerAnswer));
}

async function findMostProbableAnswer() {
	const res1 = await whichAnswerShowsUpMost();
	console.log('res1', answers[res1]);
}

findMostProbableAnswer();
