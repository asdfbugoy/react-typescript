import React from 'react';
import { observer } from 'mobx-react';
import AnswerViewItem from './AnswerViewItem';

const QuestionViewItem = ({question}) => {
	return (
		<React.Fragment>
			<div className="clearfix mb-3 mt-3 special-text">{ question.question }</div>
			<div className="row">
				{ question.sourceList.map( (answer, index) => <AnswerViewItem answer={answer} key={`aw_${question.id}_${index}`} tooltip={answer.tooltip}/> ) }
			</div>
		</React.Fragment>
	)
};

export default observer(QuestionViewItem);