import React from 'react';
import UserContext from '../../contexts/UserContext';

export default class RepresentativeList extends React.Component {
  static contextType = UserContext;

  // This generates the element for each representative tile in the pane
  generateRepList() {
    if (this.context.representatives) {
      const repElems = this.context.representatives.map((rep, idx) => {
        const title = rep.type.charAt(0).toUpperCase() + rep.type.slice(1);
        // get district if representative
        const district = title === 'representative' ? `${this.context.district}` : '';
        const photoUrl = rep.bio.photo_url;
        const party =  rep.bio.party ? rep.bio.party.charAt(0).toUpperCase() + rep.bio.party.slice(1) : '';

        return (
          <li key={rep.bioguide_id} className="representative" onClick={e => this.props.handleClickRepDetails(e, rep.references.bioguide_id)}>
            {photoUrl ? (
              <img
                className="headshot"
                src={photoUrl}
                alt={`professional photographic headshot of ${rep.bio.first_name} ${
                  rep.bio.last_name
                }`}
              />
            ) : (
              <img
                className="headshot"
                src={'http://media2.giphy.com/gifsu/5zkNlgUl7QodTlg7nT/giphy-glitter.gif'}
                alt={`professional photographic headshot of ${rep.bio.first_name} ${
                  rep.bio.last_name
                }`}
              />
            )}
            <h3 className="rep-name">{`${title} ${rep.bio.first_name} ${
              rep.bio.last_name
            }`}</h3>
            <p>
              <span className="rep-field">State: </span>
              <span className="field-val">
                {this.context.state} {district}
              </span>
            </p>
            <p>
              <span className="rep-field">Party: </span>
              <span className="field-val">{party}</span>
            </p>
            <button

              className="go-details submit"
            >
              Learn More
            </button>
          </li>
        );
      });
      return repElems;
    }
  }

  render() {
    const repElemList = this.generateRepList();

    return (
      <aside className="rep-pane">
        <ul id="rep-list">{repElemList}</ul>
      </aside>
    );
  }
}
