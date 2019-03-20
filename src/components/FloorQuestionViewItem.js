import React from 'react';
import { observer } from 'mobx-react';

const AnswerViewItem = observer( ({answer, size}) => {
	return(
		<div className={ size ? size : 'col' }>
			<a href="javascript:void(0);" 
				className={`card border ${ answer.styleChecked }`} 
				onClick={ (e) => answer.doCheck() }>
				<div className="position-absolute ml-2 mt-2"><i className="fas fa-check-circle"></i></div>
				<div className="card-body" >
					<div className="pt-4 pb-4 text-center">{ answer.label }</div>
				</div>
			</a>
		</div>
	)
});

const AnswerAPViewItem = observer( ({answer, size, value}) => {
	return(
		<div className={ size ? size : 'col' }>
			<a href="javascript:void(0);" 
				className={`card border ${ (value === answer.selectedHasAP ? 'active ' : '') }`} 
				onClick={ (e) => answer.doSelectAP(value) }>
				<div className="position-absolute ml-2 mt-2"><i className="fas fa-check-circle"></i></div>
				<div className="card-body" >
					<div className="pt-4 pb-4 text-center">{ value ? 'Yes' : 'No' }</div>
				</div>
			</a>
		</div>
	)
} );

const QuestionFloorSize = observer( ({floorIndex, question}) => {
	return(
		<div className="row">
			{ question.sourceList.map( (answer, index) => <AnswerViewItem answer={answer} key={`aw_floor_size_${floorIndex}_${index}`} /> ) }
		</div>
	)
});

const InactiveAnswerAPViewItem = ({answer, size}) => {
	return(
		<div className={ size ? size : 'col' }>
			<a href="javascript:void(0);" 
				className={`card border inactive`} 
				onClick={ (e) => answer.addNewFloorWithValue( answer.value ) }>
				<div className="position-absolute ml-2 mt-2"><i className="fas fa-check-circle"></i></div>
				<div className="card-body" >
					<div className="pt-4 pb-4 text-center">{ answer.label }</div>
				</div>
			</a>
		</div>
	)
};

const InactiveQuestionFloorSize = ({floorIndex, question}) => {
	return(
		<div className="row">
			{ question.sourceList.map( (answer, index) => <InactiveAnswerAPViewItem answer={answer} key={`aw_floor_size_${floorIndex}_${index}`} /> ) }
		</div>
	)
};

const Question = ({index, question}) => {
	return(
		<div>
			<div className="clearfix mb-4 mt-4">
			 	<h4 className="float-left">Floor #{index + 1}</h4>
				{ index > 0 && <a href="javascript:void(0);" className="float-right" onClick={ (e) => question.doDeleteFloor() }><i className="fas fa-trash"></i> Clear selection</a> }
			</div>
			<QuestionFloorSize floorIndex={index} question={question} />
			{/* <div className="clearfix mb-4 mt-4">
				Do you have your own AP for this floor?
			</div>
			<div className="row">
				<AnswerAPViewItem answer={question} value={true} key={`aw_floor_ap_${index}_no`} size='col-6 col-lg-3'/>
				<AnswerAPViewItem answer={question} value={false} key={`aw_floor_ap_${index}_yes`} size='col-6 col-lg-3'/>
			</div> */}
		</div>
	)
}

const FloorQuestionViewItem = ({question}) => {
	return (
		<div className="col">
			<div className="card-body">
				<div className="clearfix">
					<a href="javascript:void(0)" className="float-right">
						<i className="fas fa-angle-double-left"></i>
						Back
					</a>
					<h3 className="museoLight text-center mb-4">{ question.question }</h3>
				</div>
				{ question.floorQuestionPart.map( (detailQuestion, index) => <Question question={detailQuestion} index={index} key={`floor_index${index}`}/>)}
				<div className="clearfix mb-4 mt-4">
					<h4 className="text-black-50">Unset Floor</h4>
				</div>
				<InactiveQuestionFloorSize floorIndex='unset' question={question.floorQuestionPart[0]} />
			</div>
		</div>
	)
};

export default observer(FloorQuestionViewItem);