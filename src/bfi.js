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

		const onChange = event => update(parseInt(event.target.value));

		return (
			<tr><td align='right'>{idx + 1}: </td><td>
			<div id={idx} key={idx}> 
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
			</td></tr>
		);
	}

	const calcBfi = () => {
		if(BFI.validAnswers(answers)) {
			const res = BFI.scoreBFI(answers);
			setBfi(res);
		} else {
			console.log('INVALID ANSWERS', answers);
		}
	}

	const questions = [...Array(44).keys()];

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
				<table>
				{
					questions.map(q => (
						AnswerSelector(q)
					))
				}
				</table>
			</div>
		</>
	)
}
