import { useState, useEffect, useContext } from 'react';
import './App.css';
import { Moment } from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField } from '@mui/material';
import { store } from './store/Store';
import { AppService } from './App.service';
import { Person } from './types/Person';
import BirthdaySection from './components/BirthdaySection';
import FavouritesSection from './components/FavouritesSection';

function App() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const [value, setValue] = useState<Moment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Grab birthdays when date value changes
  useEffect(() => {
    if (value) {
      // Empty current list
      dispatch({type: 'saveFilteredBirthdays', data: []});
      getBirthdays(value?.month() + 1, value?.date());
    }
    // eslint-disable-next-line
  }, [value]);

  // Get birthdays from service
  const getBirthdays = async (month: number, day: number) => {
    setLoading(true);
    const birthdayResponse = await AppService.getBirthdays(month, day);
    dispatch({type: 'saveFilteredBirthdays', data: mapBirthdayFavourites(birthdayResponse)});
    dispatch({type: 'saveBirthdays', data: mapBirthdayFavourites(birthdayResponse)});
    setLoading(false);
  }

  // Map new birthday results to favourites
  const mapBirthdayFavourites = (birthdays: Person[]) => {
    for (const person of birthdays) {
      for (const date of state.favourites) {
        for (const fPerson of date.people) {
          if (person.text === fPerson.text) person.favourite = fPerson.favourite;
        }
      }
    }

    return birthdays;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="content-area">
        <div className="main">
          <div className="App-header">
            <DatePicker
              label="Birthday"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          {value &&
            <BirthdaySection 
              date={`${value?.format('MMMM D')}`}
              loading={loading} />
          }
        </div>
        <FavouritesSection favourites={state.favourites} />
      </div>
    </LocalizationProvider>
  );
}

export default App;
