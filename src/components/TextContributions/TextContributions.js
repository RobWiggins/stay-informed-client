import React from 'react'

export default class TextContributions extends React.Component {
  render() {

    // TODO REMOVE
    let contribList = ''
    let contribHeader = ''

    if (this.props.topIndustries) {
      contribHeader = 'Top Industries by monetary donations'
      contribList = this.props.topIndustries.map((group, idx) => {
        const total = parseInt(group.total_attributed).toLocaleString();
        if (idx < 5){
          if (group.industry === 'TV/Movies/Music') {
            return (
              <p className='contributionItem' key={group.industry}>
                <span className='repPage-span'>TV / Movies / Music</span>
                <span className='contributionAmount'>${total}</span>
              </p>
            )}
          
          return (
            <p className='contributionItem' key={group.industry}>
              <span className='repPage-span'>{group.industry}</span>
              <span className='contributionAmount'>${total}</span>
            </p>
          )}
          return '';
      })
    } else if (this.props.fundingAndSpending) {
      contribHeader = 'Budget History'
      const total_donations = parseInt(this.props.fundingAndSpending.totalFunding).toLocaleString();
      const spent = parseInt(this.props.fundingAndSpending.totalSpent).toLocaleString();
      const cash_on_hand = parseInt(this.props.fundingAndSpending.cashOnHand).toLocaleString();

      contribList = (
        <>
        <p className='contributionItem'>
          <span className='repPage-span'>Total Donations</span>
          <span className='contributionAmount'>${total_donations}</span>
        </p>
        <p className='contributionItem'>
          <span className='repPage-span'>Spent {' '} {'  '}</span>
          <span className='contributionAmount'>${spent}</span>
        </p>
        <p className='contributionItem'>
          <span className='repPage-span'>Cash on Hand</span>
          <span className='contributionAmount'>${cash_on_hand}</span>
        </p>

        </>
      )
    }


    return (
      <div className='mobile-contributions'>
        <h2>{contribHeader}</h2>
        {contribList}
      </div>
    )
  }
}
