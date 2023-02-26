import { ChangeEvent, useContext } from 'react';
import { TextField, CircularProgress,Card, CardContent } from '@mui/material';
import { store } from '../store/Store';
import { Person } from '../types/Person';
import { Favourite } from '../types/Favourite';
import BirthdayListItem from '../BirthdayListItem';

function BirthdaySection({ date, loading }: { date: string, loading: boolean }) {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  // Toggle favourite person
  const toggleFavourite = (person: Person) => {
    // Clone
    const tempArray: Favourite[] = state.favourites;
    const dateString = date;
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
    dispatch({type: 'saveFilteredBirthdays', data: [...state.filteredBirthdays].map(bday => {
      if (bday.text === person.text) {
        return {...bday, favourite: person.favourite}
      } else return bday;
    })});
  }
  
  // On search filter
  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value?.toLowerCase();

    dispatch({type: 'saveFilteredBirthdays', data: value ?
      state.birthdays.filter((person: Person) => person.text.toLowerCase().includes(value)) :
      state.birthdays});
  }

  return (
    <Card>
      <CardContent>
        <div className="birthday-results-body">
          <h1 className="header">Birthdays on {date}</h1>
          {!loading &&
            <TextField 
              variant="outlined" 
              label="Search"
              onChange={onSearch} />
          }
          {loading && <div className="loading"><CircularProgress /></div>}
          <ul className="list">
            {state.filteredBirthdays.map((person: Person) => (
              <BirthdayListItem key={person.text} person={person} toggleFavouriteFn={() => toggleFavourite(person)} />
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default BirthdaySection;
