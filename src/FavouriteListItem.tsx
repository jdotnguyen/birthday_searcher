import { Favourite } from './types/Favourite';
import './FavouriteListItem.css';

function FavouriteListItem({ date } : { date: Favourite }) {
  return (
    <>
      {date.people.length > 0 &&
        <li>
          <b>{date.date}</b>
          <ul>
            {date.people.map((person, index) => (
              <li key={index} title={person.text}>
                <b>{person.text.split(',')[0]}</b>
                <span>{person.text.split(',')[1]}</span>
              </li>
            ))}
          </ul>
        </li>
      }
    </>
  );
}

export default FavouriteListItem;
