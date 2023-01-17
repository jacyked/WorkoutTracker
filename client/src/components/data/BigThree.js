import {useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  LineSeries,
  SplineSeries,
} from '@devexpress/dx-react-chart-material-ui';

function calcMax(arr) {
    let max = 0;
    arr.forEach((set) => {

    })
    return max;
}

function buildData(){
     
}

export const BigThree = (props) => {
    const [data, setData] = useState(buildData)

    return (
      <Paper>
        <Chart
          data={data}
        >
          <LineSeries
            valueField="lineValue"
            argumentField="argument"
          />
          <SplineSeries
            valueField="splineValue"
            argumentField="argument"
          />
        </Chart>
      </Paper>
    );
}

