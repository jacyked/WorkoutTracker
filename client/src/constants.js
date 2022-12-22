//Base Backend URL
export const BASE_URL = 'http://localhost:8080';
//Backend Routes
export const REGISTER_URL = "/register";
export const LOGIN_URL = '/auth';
export const USER_URL = "./user";
export const ALLEX_URL="/exercises";
export const EX_URL="/exercises/search/";
export const SEARCH_EX_URL = '/exercises/search'
//Regex strings
export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//Content Constants
export const muscleTypes = ['All','Abdominals', 'Abductors', 'Adductors', 'Biceps', 'Calves', 'Chest', 'Forearms', 'Glutes', 'Hamstrings', 'Lats', 'Lower Back', 'Middle Back', 'Neck', 'Quadriceps', 'Shoulders', 'Traps', 'Triceps']
export const equipmentTypes = ['All', 'Bands','Barbell','Body Only','Cable','Dumbbell','Exercise Ball','E-Z Curl Bar','Foam Roll','Kettlebells','Machine','Medicine Ball','Other','None']

