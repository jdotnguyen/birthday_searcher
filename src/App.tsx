import { useState, useEffect, ChangeEvent, useRef, useContext } from 'react';
import './App.css';
import { Moment } from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField, CircularProgress } from '@mui/material';
import { store } from './store/Store';
import { AppService } from './App.service';
import { Person } from './types/Person';
import { Favourite } from './types/Favourite';
import FavouriteListItem from './FavouriteListItem';
import BirthdayListItem from './BirthdayListItem';

function App() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const [value, setValue] = useState<Moment | null>(null);
  const birthdayRef = useRef<Person[]>([]);
  const [filteredBirthdays, setFilteredBirthdays] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean | null>();

  // Grab birthdays when date value changes
  useEffect(() => {
    if (value) {
      // Empty current list
      setFilteredBirthdays([]);
      getBirthdays(value?.month() + 1, value?.date());
    }
    // eslint-disable-next-line
  }, [value]);

  // Get birthdays from service
  const getBirthdays = async (month: number, day: number) => {
    setLoading(true);
    const birthdayResponse = await AppService.getBirthdays(month, day);
    setFilteredBirthdays(mapBirthdayFavourites(birthdayResponse));
    birthdayRef.current = mapBirthdayFavourites(birthdayResponse);
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

  // Toggle favourite person
  const toggleFavourite = (person: Person) => {
    // Clone
    const tempArray: Favourite[] = state.favourites;
    const dateString = `${value?.format('MMMM D')}`
    const tempObj = tempArray.find(date => date.date === dateString) || {date: dateString, people: []};

    // Toggle people in date object
    person.favourite = !Boolean(person.favourite);
    if (person.favourite && !tempObj.people.find(p => p.text === person.text)) {
      tempObj.people.push(person);
    } else {
      const index = tempObj.people.findIndex(p => p.text === person.text);
      tempObj.people.splice(index, 1);
    }

    if (!tempArray.find(date => date.date === dateString)) {
      tempArray.push(tempObj);
    } else {
      tempArray.filter(date => date.date === dateString)[0].people = tempObj.people;
    }

    dispatch({type: 'saveFavourite', data: [...tempArray]});
    setFilteredBirthdays([...filteredBirthdays].map(bday => {
      if (bday.text === person.text) {
        return {...bday, favourite: person.favourite}
      } else return bday;
    }));
  }
  
  // On search filter
  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value?.toLowerCase();

    setFilteredBirthdays(
      value ?
        birthdayRef.current.filter(person => person.text.toLowerCase().includes(value)) :
        birthdayRef.current
      );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="App">
        <div className="App-header">
          <DatePicker
            label="Birthday"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <div className="favourite-bday-body">
            <h1 className="header">Favourite Birthdays</h1>
            <ul className="list">
              {(state.favourites as Favourite[]).map((date, index) => (
                <FavouriteListItem key={index} date={date} />
              ))}
            </ul>
          </div>
        </div>
        {value &&
          <div className="birthday-results-body">
            <h1 className="header">Birthdays on {`${value?.format('MMMM D')}`}</h1>
            {!loading &&
              <TextField 
                variant="outlined" 
                label="Search"
                onChange={onSearch} />
            }
            {loading && <div className="loading"><CircularProgress /></div>}
            <ul className="list">
              {filteredBirthdays.map((person) => (
                <BirthdayListItem key={person.text} person={person} toggleFavouriteFn={() => toggleFavourite(person)} />
              ))}
            </ul>
          </div>
        }
      </div>
    </LocalizationProvider>
  );
}

export default App;
