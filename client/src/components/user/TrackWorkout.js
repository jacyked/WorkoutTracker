import React from "react";


const API_URL="/api";
const TrackWorkout = () => {

    const [user, setUser] = useState();
    const axiosPrivate = useAxiosPrivate();
  
    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
  
      const getUser = async() => {
          try{
              const response = await axiosPrivate.get(API_URL, {
                  signal: controller.signal
              });
              console.log(response.data);
              isMounted && setUser(response.data);
              //console.log("User: " + JSON.stringify(response.data));
          }catch(err){
              console.error(err);
          }
  
      }
      getUser();
  
      return () => {
          isMounted = false;
          controller.abort();
      }
    }, [])

    return(
        <React.Fragment>

        </React.Fragment>
    );

}

export default TrackWorkout;