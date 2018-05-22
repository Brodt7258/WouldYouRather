import React, { Component } from 'react';
import {
  FlexibleWidthXYPlot,
  HorizontalBarSeries,
  GradientDefs
} from 'react-vis';


class VoteChart extends Component {
  render() {
    const { optOneVotes, optTwoVotes, style } = this.props;
    return (
      <div style={style}>
        <FlexibleWidthXYPlot
          height={100}
          stackBy="x">
          <GradientDefs>
            <linearGradient id="optOne" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(79,97,175)" stopOpacity={0.7}/>
              <stop offset="100%" stopColor="rgb(57,181,191)" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id="optTwo" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(254,146,69)" stopOpacity={0.7}/>
              <stop offset="100%" stopColor="rgb(226,55,139)" stopOpacity={0.7} />
            </linearGradient>
          </GradientDefs>
          <HorizontalBarSeries
            color={'url(#optOne)'}
            data={[
              {x: optOneVotes, y: 3},
            ]}
          />
          <HorizontalBarSeries
            color={'url(#optTwo)'}
            data={[
              {x: optTwoVotes, y: 3}
            ]}/>
        </FlexibleWidthXYPlot>
      </div>
  );
};

}

export default VoteChart;
