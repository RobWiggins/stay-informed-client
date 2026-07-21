import React from "react";
import ContribsChart from "./ContribsChart";

function TotalContributions(props) {
  return (
    <ContribsChart
      funding={props.fundingAndSpending.totalFunding}
      spent={props.fundingAndSpending.totalSpent}
      cashOnHand={props.fundingAndSpending.cashOnHand}
    />
  );
}

export default TotalContributions;
