import React, { Component } from 'react';
import {
  FlexibleWidthXYPlot,
  HorizontalBarSeries,
} from 'react-vis';


class VoteChart extends Component {
  render() {
    const { optOneVotes, optTwoVotes, style } = this.props;
    return (
      <div style={style}>
        <FlexibleWidthXYPlot
          height={100}
          stackBy="x">
          <HorizontalBarSeries
            data={[
              {x: optOneVotes, y: 3},
            ]}
          />
          <HorizontalBarSeries
            data={[
              {x: optTwoVotes, y: 3}
            ]}/>
        </FlexibleWidthXYPlot>
      </div>
  );
};

}

export default VoteChart;
