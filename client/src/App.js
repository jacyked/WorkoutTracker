import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Missing from './components/Missing';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';

import UserProfile from './components/user/UserProfile';
import TrackWorkout from './components/user/TrackWorkout';
import Exercises from './components/user/Exercises';
import ExerciseInfo from './components/user/ExerciseInfo';
import EditWorkout from './components/user/EditWorkout';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="user" element={<UserProfile />}/>
            <Route path="track" element={<TrackWorkout />} />
            <Route path="track/edit" element={<EditWorkout />} />
            <Route path="exercises" element={<Exercises/>}/>
            <Route path="exercises/:exID" element={<ExerciseInfo/>}/>
            
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;