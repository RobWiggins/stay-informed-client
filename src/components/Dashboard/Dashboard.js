import React from 'react';
import UserContext from '../../contexts/UserContext';
import RepresentativeService from '../../services/representatives-service';
import RepresentativeList from '../../components/RepresentativeList/RepresentativeList.js';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import NewsList from '../NewsList/NewsList';
import './Dashboard.scss'
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay'

export default class Dashboard extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  static contextType = UserContext;

  componentDidMount() {
    if (this.context.user.address) {
      this.context.setFetching(true);

      RepresentativeService.getReps(this.context.user.address)
        .then(res => {
          if (res.address.state_province) {
            this.context.setUserState(res.address.state_province.toUpperCase());
          }
          if (res.district.name) {
            this.context.setUserDistrict(res.district.name);
          }
          if (res.representatives) {
            this.context.setRepresentatives(res.representatives);
          }
          this.context.setFetching(false);
        })
        .then(() => {
          RepresentativeService.getNews(
            this.context.representatives[0].bio,
            this.context.representatives[1].bio,
            this.context.representatives[2].bio
          )
            .then(news => this.context.setNews(news.articles))
            // TODO GET FINANCES FOR EACH REP AND SET IN CONTEXT??
          // this.context.representatives.forEach((rep,idx)=> {
          //   RepresentativeService.getFinances(rep.crp_id).then(response => {
          //     this.context.setFinancesOnRep(response, idx);
          //   })
          // })

        }).catch(error => this.context.setError(error));
    } else {this.props.history.push('/')}
  }

  handleClickRepDetails = (event, bioguideId) => {
    event.preventDefault();

    if (!bioguideId) {
      this.context.setError(
        new Error('Representative is missing a bioguide_id')
      );
      return;
    }

    this.props.history.push(`/representatives/${bioguideId}`);
  };

  render() {
    let myData = '';

    if (this.context.user.address) {
      myData = (
        <aside className="myData" >
          <h2 className='title'>Your Elected Officials</h2>
          <div className='myData-text'>
            <p>
              <span className="repPage-span">State</span> {this.context.state}
            </p>
            <p>
              <span className="repPage-span">District</span> {this.context.district}
            </p>
            <p>
                <button className='submit register-button' > <Link to="/voter-registration" className='register-link'> Not registered to vote? 
                <br/>Register here.</Link> </button> 
              
            </p>
          </div>

        </aside>
      );
    }
    return (
      <main className='mainDashboard' role="main">

        {(this.context.fetching && !this.context.error) ? (
          <Spinner />
        ) : (
          (this.context.error) ? (
            <ErrorDisplay />
          ) : (
          <>
            <section className="dashboard">
              {myData}
              <RepresentativeList
                handleClickRepDetails={this.handleClickRepDetails}
              />
            </section>
            <section className='NewsList'>
              <NewsList />
            </section>
          </>
          )
        )}

      </main>
    );
  }
}
