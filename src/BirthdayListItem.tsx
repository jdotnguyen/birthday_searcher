import { IconButton } from '@mui/material';
import { Star } from '@mui/icons-material';
import { Person } from './types/Person';

function BirthdayListItem({ person, toggleFavouriteFn } : { person: Person, toggleFavouriteFn: any }) {
  return (
    <li>
      <IconButton 
        onClick={toggleFavouriteFn}
        style={{color: person.favourite ? '#0073c6' : '#cdcdcd'}} 
        data-testid="favourite"
        aria-label="favourite">
        <Star />
      </IconButton>
      <span>{person.text}</span>
    </li>
  );
}

export default BirthdayListItem;
