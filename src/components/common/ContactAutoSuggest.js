import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash.debounce';
import './AutoSuggest.css';

class ContactAutoSuggest extends React.Component{
	constructor(){
		super();
		this.state = {
			suggestions: []
		}
	}

	onChange = (event, {newValue}) => {
		this.props.contact.onChange({
			name: event.target.name,
			value: newValue
		})
	};
	
	shouldRenderSuggestions(value) {
		return value.trim().length > 1;
	}
	
	onSuggestionsFetchRequested = debounce( (input) => {
		if ( input.reason !== 'input-changed' ) return false;
		this.props.contact
			.fetchContact({
				accountId: this.props.accountId, 
				query: input.value
			})
			.then( response => this.setState({
				suggestions: response
			}))
	}, 500)
	
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	onSuggestionsSelect(suggestion) {
		this.props.contact.onSelectContact( suggestion );
	}

	renderResultItem( suggestion ) {
		const { firstName, lastName, contactEmail} = suggestion;
		return(
			<div className="d-block text-truncate" >
				<strong>{firstName} {lastName}</strong> - {contactEmail}
			</div>
		)
	}
	
	render() {
		const { suggestions } = this.state;
	
		const inputProps = {
		  placeholder: this.props.placeholder ? this.props.placeholder : '',
		  value: this.props.value,
		  name: this.props.name,
		  onChange: this.onChange
		};
		const theme= {
			container:                'react-autosuggest__container form-group',
			containerOpen:            'react-autosuggest__container--open',
			input:                    `form-control ${this.props.name === 'contactEmail' && !this.props.contact.isValidContactEmail() ? 'is-invalid': ''}`,
			inputOpen:                'react-autosuggest__input--open',
			inputFocused:             'react-autosuggest__input--focused',
			suggestionsContainer:     'react-autosuggest__suggestions-container',
			suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
			suggestionsList:          'react-autosuggest__suggestions-list',
			suggestion:               'react-autosuggest__suggestion',
			suggestionFirst:          'react-autosuggest__suggestion--first',
			suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
			sectionContainer:         'react-autosuggest__section-container',
			sectionContainerFirst:    'react-autosuggest__section-container--first',
			sectionTitle:             'react-autosuggest__section-title'
		}
	
		return (
		  <Autosuggest
			theme={theme}
			suggestions={suggestions}
			onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
			onSuggestionsClearRequested={this.onSuggestionsClearRequested}
			shouldRenderSuggestions={this.shouldRenderSuggestions.bind(this)}
			getSuggestionValue={this.onSuggestionsSelect.bind(this)}
			renderSuggestion={this.renderResultItem}
			inputProps={inputProps}
		  />
		);
	  }
}

ContactAutoSuggest.propTypes = {
	accountId: PropTypes.string.isRequired,
	contact: PropTypes.object.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
};

export {ContactAutoSuggest};