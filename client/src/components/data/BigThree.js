import {useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  LineSeries,
  SplineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { GET_DATA } from '../../constants';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export const BigThree = (props) => {
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState(buildData);
    
    
    function calcMax(arr) {
        let max = 0;
        arr.forEach((set) => {
    
        })
        return max;
    }
    
    async function buildData(){
        try{
            const response = await axiosPrivate.get(GET_DATA);
            console.log("###########Fired: BigThree##############");
            console.log("DATA: " + JSON.stringify(response.data));
            return(response.data);
        }catch(err){
            
            console.error("######ERRR#####"+ err);
        }
        return("")
    }



    return (
      <Paper>

      </Paper>
    );
}

