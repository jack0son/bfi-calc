import React, { useState } from 'react';

import BFI from './lib/bfi';

export default function SelectAnswers() {
	const [answers, setAnswers] = useState(BFI.answers || []);
	const [bfi, setBfi] = useState({});

	const updateAnswer = (idx, score) => {
		setAnswers(answers => { answers[idx] = score; return answers; });
	}

	function AnswerSelector(idx) {
		const update = score => updateAnswer(idx, score);

		const onChange = event => {
			console.dir(event);
			console.dir(event.target);
			update(parseInt(event.target.value));
		}

		return (
			<div id={idx} key={idx}> {idx + 1}: 
					{
						[1,2,3,4,5].map(val => (
							<>
								<input
									type="radio"
									name={`score-${idx}`}
									id={`${idx}-${val}`}
									value={val}
									defaultChecked={answers[idx] && answers[idx] == parseInt(val)}
									onChange={e => onChange(e)}
								/>
							<label for={`${idx}-${val}`}>{val}  </label>
							</>
						))
					}
				</div>
		);
	}

	const calcBfi = () => {
		if(BFI.validAnswers(answers)) {
			const res = BFI.scoreBFI(answers);
			setBfi(res);
		} else {
			console.log(answers.length);
			console.log(answers);
		}
	}

	const questions = [...Array(44).keys()];
	console.log(questions);

	return (
		<>
			<button onClick={calcBfi}>Calculate</button>
			<div id='score'>
				<table>

					{
						Object.keys(bfi).map(dimension => (
							<tr><td>{dimension}</td><td>{bfi[dimension].score}</td></tr>
						))

					}
				</table>
			</div>
			<div id='questions'>
				{
					questions.map(q => (
						AnswerSelector(q)
					))
				}
			</div>
		</>
	)
}
