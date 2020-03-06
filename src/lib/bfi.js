
const dimensions = {
	'extraversion': ['1', '6R', '11', '16', '21R', '26', '31R', '36'],
	'agreeableness': ['2R', '7', '12R', '17', '22', '27R', '32', '37R', '42'],
	'conscientiousness': ['3', '8R', '13', '18R', '23R', '28', '33', '38', '43R'],
	'neuroticism': ['4', '9R', '14', '19', '24R', '29', '34R', '39'],
	'Openness': ['5', '10', '15', '20', '25', '30', '35R', '40', '41R', '44'],
};


function scoreBFI(answers) {
	if(answers.length != 44) {
		throw new Error('Must have exactly 44 answers');
	}

	const result = {};
	Object.keys(dimensions).forEach(name => {
		let res = scoreDimension(dimensions[name], answers);
		//console.log(res);
		console.log(`${name}: ${res.score}`);
		result[name] = res;
	});
	return result;
}

function scoreDimension(dimension, answers) {
	let total = 0;
	dimension.forEach(item => {
		let score, index;
		let rev = false;
		if(item.endsWith('R')) {
			index = parseInt(item.slice(0, item.length - 1));
			rev = true;
		} else {
			index = parseInt(item);
		}

		score = answers[index - 1];
		if(rev) score = reverse(score);

		total += score;
	})

	return {
		total,
		score: total / dimension.length,
	}
}

function reverse(score) {
	switch(score) {
		case 1: return 5;
		case 2: return 4;
		case 4: return 2;
		case 5: return 1;
		default: return score;
	}
}

function validAnswers(answers) {
	return answers && answers.length && answers.length == 44 &&
		answers.filter(a => a >= 1 && a <= 5).length === 44;
}

const answers = [4, 4, 4, 3, 4, 2, 2, 2, 3, 5, 4, 4, 3, 4, 4, 4, 3, 4, 4, 5, 4, 2, 3, 3, 5, 3, 4, 4, 3, 4, 4, 3, 2, 3, 1, 3, 3, 2, 3, 5, 2, 2, 4, 3];

module.exports = {
	scoreBFI,
	validAnswers,
	answers,
}
