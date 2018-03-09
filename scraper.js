var google = require('google')
const program = require('commander');

program
  .version('0.1.0')
  .option('-q, --question <answer>', 'The question to query')
  .option('-a, --answerA <answer>', 'Answer A')
  .option('-b, --answerB <answer>', 'Answer B')
  .option('-c, --answerC <answer>', 'Answer C')
  .option('-d, --answerD <answer>', 'Answer D')
  .parse(process.argv);

google.resultsPerPage = 1
const nextCounter = 0
const pages = 4;

const question = program.question;
const answers = [program.answerA]
  .concat(program.answerB || [])
  .concat(program.answerC || [])
  .concat(program.answerD || [])

console.log('question', question);
console.log('answers', answers);

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
				  if (err) console.error(err);
					var count = res.links.reduce((sum, l) => {
						return sum + occurrences(l.description, a, false);
					}, 0);

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
	console.log('ANSWER', answers[res1]);
}

findMostProbableAnswer();
