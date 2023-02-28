import { IconButton } from '@mui/material';
import { Star } from '@mui/icons-material';
import { Person } from '../types/Person';
import './BirthdayListItem.css';

function BirthdayListItem({ person, toggleFavouriteFn } : { person: Person, toggleFavouriteFn: any }) {
  return (
    <li title={person.text}>
      <IconButton 
        onClick={toggleFavouriteFn}
        style={{color: person.favourite ? '#0073c6' : '#cdcdcd'}} 
        data-testid="favourite"
        aria-label="favourite">
        <Star />
      </IconButton>
      <b>{person.text.split(',')[0]}</b>
      <span>{person.text.split(',')[1]}</span>
    </li>
  );
}

export default BirthdayListItem;
