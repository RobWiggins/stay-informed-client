import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import TotalContributions from '../../components/TotalContributions/TotalContributions';
import FinancialContributions from '../../components/FinancialContributions/FinancialContributions';
import TextContributions from '../../components/TextContributions/TextContributions';
import './RepresentativeRoute.scss';
import Icon from 'react-simple-icons';
import MoneySpinner from '../../components/MoneySpinner/Spinner';
import Elephant from './elephant.png';
import Donkey from './donkey.png';
import RepresentativeService from '../../services/representatives-service';

export default class RepresentativeRoute extends React.Component {
  static contextType = UserContext;

  state = {
    loadingFinances: true,
    financeError: null,
    topIndustries: [],
    totalFundingAndSpending: null,
  };

  componentDidMount() {
    window.scrollTo(0,0);

    const representatives = this.context.representatives || [];


    if (representatives.length === 0) {
      this.props.history.push('/');
    }

    this.loadFinances()
  }

  loadFinances = async () => {
    const { bioguideId } = this.props.match.params

    try {
      this.setState({
        loadingFinances: true,
        financeError: null,
      })

    const { bioguideId, totalFundingAndSpending, topIndustries } = await RepresentativeService.getFinances(bioguideId)

    this.setState({
      topIndustries: topIndustries || [],
      totalFundingAndSpending: totalFundingAndSpending || null,
      loadingFinances: false,
    })
  } catch (error) {
    console.error('Finance request failed:', error)
 
    this.setState({
      financeError: error, loadingFinances: false
    })
  }
  }


  render() {

    const {
      loadingFinances,
      financeError,
      topIndustries,
      totalFundingAndSpending,
    } = this.state;

    let bioguideId = this.props.match.params.bioguideId;
    let name = '';
    let party = '';
    let currentRole = '';
    let contribs = '';
    // TODO REMOVE
    // let totalFundingAndSpending;
    // let topIndustries;
    let currentRepImg = '';
    let phone = '';
    let url = '';
    let fbUrl = '';
    let twitterUrl = '';

    if (this.context.representatives) {
      const currentRep = this.context.representatives.find(
        rep => String(rep.references.bioguide_id) === String(bioguideId)
      );

    if (!currentRep) {
      return (
        <main>
          <h2>Representative not found</h2>
          <p>No representative matched ID: {bioguideId}</p>
        </main>
    )}

      name = `${currentRep.bio.first_name} ${currentRep.bio.last_name}`;
      currentRole = currentRep.type.charAt(0).toUpperCase() + currentRep.type.slice(1);
      phone = currentRep.contact.phone;
      url = currentRep.contact.url;
      fbUrl = currentRep.social.facebook;
      twitterUrl = currentRep.social.twitter;
      party =
        currentRep.bio.party === 'Republican' ? (
          <div>
            Republican <img className="partyIcon" src={Elephant} alt="" />
          </div>
        ) : (
          <div>
            Democrat <img className="partyIcon" src={Donkey} alt="" />
          </div>
        );

      console.log("currentRep before reading finances --->", currentRep);
      // totalFundingAndSpending = currentRep.totalFundingAndSpending || null;
      // TODO ADD, FIX, OR REMOVE
      // totalFundingAndSpending = currentRep.totalFundingAndSpending || null;
      // console.log("topIndustries on client", currentRep.topIndustries)
      // topIndustries = currentRep.topIndustries || null;
      if (currentRep.bio.photo_url) {
        currentRepImg = (
          <img
            src={currentRep.bio.photo_url}
            alt={`professional headshot of ${name}`}
          />
        );
      }
    }

    return (
      <div className="representativePage">
        <section className="repPage-section" id="contact-info">
          <div className="repPage-section-text">
            <h1 className="repPage-name">
              <span className="repPage-span">Name</span>
              {name}
            </h1>
            <h2 className="repPage-title">
              <span className="repPage-span">Title</span>
              {currentRole}
            </h2>
            <h3 className="repPage-party">
              <span className="repPage-span">Party</span>
              {party}
            </h3>
            {phone && (
              <p className="repPage-phone">
                <span className="repPage-span">Phone</span>{' '}
                <a href={`tel:${phone}`}>{phone}</a>
              </p>
            )}
            {url && (
              <p className="repPage-url">
                <span className="repPage-span">Website</span>{' '}
                <span className="site">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    Visit
                  </a>
                </span>
              </p>
            )}
            <div className='socialIconsDiv'>
            {twitterUrl && (
              <a
                href={twitterUrl}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="twitter" />
              </a>
            )}
            {fbUrl && (
              <a
                href={fbUrl}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="facebook" />
              </a>
            )}
            </div>
            <Link className="back-nav" to="/dashboard">
              {' \u2b05 Go Back'}
            </Link>
          </div>
          <div className="repPage-section-other repPage-section-image">
            <div className="representativeImage">{currentRepImg}</div>
          </div>
        </section>
        {!loadingFinances ? (
          <>
            {/* <section className="repPage-section">
              <TextContributions contributions={topContribs} />
              <h3 className="chartDesc">
                Among all organizations, your representative accepted the
                greatest dollar amount from these organizations. They may
                possess a disproportionate influence over your representative's
                platform and policies.
              </h3>
              <FinancialContributions contributions={topContribs} />
            </section> */}
            <section className="repPage-section">
              <TextContributions contributions={topIndustries} />
              <h3 className="chartDesc">
                Among all sectors, these business sectors donated the
                greatest dollar amount to this representative. Your
                representative may be held particularly captive to the business
                interests of these sectors.
              </h3>
              <FinancialContributions contributions={topIndustries} />
            </section>
            <section className="repPage-section">
              <TextContributions fundingAndSpending={totalFundingAndSpending} />
              <h3 className="chartDesc">
                The degree of donations and spending in the last campaign cycle
                lends insight into the strength of the representative's funding
                infrastructure. Larger budgets typically grant candidates
                greater visibility.
              </h3>
              <TotalContributions fundingAndSpending={totalFundingAndSpending} />
            </section>
          </>
        ) : (
          <MoneySpinner />
        )}
      </div>
    );
  }
}
