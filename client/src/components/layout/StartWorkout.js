

export const StartWorkout = (props) => {


    const searchExercise = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Searching for: " + findExercise);
        //Search axios for matching exercises
        try{
            const response = await axiosPrivate.get(SEARCH_EX_URL, {
                params: {
                limit: OFFSET,
                skip: 0,
                searchTerm: findExercise
                }
            });
        //TODO if returned list < limit, add end of results flag
        console.log("Request made for search");
        console.log("Results: " + JSON.stringify(response.data));
        const list = Array.from(response.data);
        list.forEach((i) => {
          console.log(i.fullName)})
        setResults(list);
        setCount(count + 1);
        setTargets("");
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }

    const loadMore = async (e) => {
        setLoading(true);
        try{
          const response = await axiosPrivate.get(SEARCH_EX_URL, {
              params: {
                limit: OFFSET,
                skip: (count * OFFSET),
                searchTerm: findExercise,
                targets: recTargets
                //TODO if returned list < limit, add end of results flag
              }
          });
          //console.log("Fired: Load More");
          //console.log("DATA: " + JSON.stringify(response.data));
          const list = Array.from(response.data);
          list.forEach((i) => {
            console.log(i.fullName)})
          setResults(results.concat(list));
          setLoading(false);
          setCount(count + 1);
  
          
        }catch(err){
            console.error(err);
        }
  
      }

      useEffect(() => {
        setLoading(true);
        let isMounted = true;
        const controller = new AbortController();
        if(defaultResults){
        //console.log(JSON.stringify(auth));
        const getDefault = async() => {
            try{
                //All User routes removed the signal in axios request. may want to reinstate
                const response = await axiosPrivate.get(SEARCH_EX_URL, {
                    signal: controller.signal,
                    params: {
                      limit: OFFSET,
                      skip: 0,
                      targets: recTargets,
                    }
                });
                //console.log("Fired: Exercises");
                //console.log("DATA: " + JSON.stringify(response.data));
                //const test = JSON.parse(response.data);
                //console.log("Parsed: " + test);

                //response.data.forEach(e => console.log("Element " + JSON.stringify(e)))
                //response.data[0].forEach(console.log("ForEach sent"))
                const list = Array.from(response.data);
                isMounted && setResults(list);
                //setAuth({...auth.prev, curUser: response.data});
                //console.log("User: " + JSON.stringify(response.data));
                
            }catch(err){
                console.error(err);
            }
  
        }
        getDefault();
        setLoading(false);
    }
    return () => {
        console.log("cleanup, aborting exercises axios. ");
          isMounted = false;
          controller.abort();
      }
    }, [])

    return(
    <React.Fragment>
        <Container>
        <TextField 
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton aria-label="search" colour="primary" onClick={(e) => searchExercise(e)}>
                                <SearchIcon />
                            </IconButton> 
                        </InputAdornment>
                    ),
                }} 
            id="exSearch"
            name="exSearch"
            label="Find Exercise: "
            value={findExercise}
            onChange={(e) => setFindExercise(e.target.value)}/>
            <Box>
            {(loading)
            ?(
                //loading
                < LinearProgress maxWidth={400}/>
            ):(!selected)?(
                //display search results or default reccomended list
                <List dense={true}>
                {results.map((row) => (
                    <ListItemButton key={row._id} onClick={() => {
                    //TODO come back and init click listener to select item
                      console.log("Clicked" + row.fullName)
                    }}>
                      <ListItemText primary={row.fullName}  secondary={<React.Fragment><div>Targets:  {row.mainMuscleName} </div><div>Equipment: {row?.equipmentTypes?.toString()}</div></React.Fragment>}/>
                        <ListItemIcon edge="end">
                            {(parseFloat(row.rating) <= 0)
                            //invalid
                            ? <CheckBoxOutlineBlankOutlinedIcon />
                            //valid
                            :(parseFloat(row.rating) <= 2)
                            ? <LooksOneOutlinedIcon />
                            :(parseFloat(row.rating) <= 4)
                            ? <LooksTwoOutlinedIcon color="error"/>
                            :(parseFloat(row.rating) <= 6)
                            ?<Looks3OutlinedIcon color="warning"/>
                            :(parseFloat(row.rating) <= 8)
                            ?<Looks4OutlinedIcon color="#B6E824"/>
                            :(parseFloat(row.rating) <= 10)
                            ?<Looks5OutlinedIcon color="success"/>
                            :<CheckBoxOutlineBlankOutlinedIcon/>
                            }
                        </ListItemIcon>
                    </ListItemButton>
                  ))}
                  <ListItemButton onClick={(e) => loadMore(e)}>
                    <ListItemText primary="Load More..." />
                    <ListItemIcon edge="bottom">
                        <KeyboardArrowDownIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </List>
            ):(
                //display selected exercise view for entering sets/reps, equipment, etc
                <p>Selected</p>

            )}
            </Box>
        </Container>
    </React.Fragment>);


}

