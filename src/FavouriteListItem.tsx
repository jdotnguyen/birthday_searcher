import { Favourite } from './types/Favourite';

function FavouriteListItem({ date } : { date: Favourite }) {
  return (
    <>
      {date.people.length > 0 &&
        <li>
          <b>{date.date}</b>
          <ul>
            {date.people.map((person, index) => (
              <li key={index}>{person.text}</li>
            ))}
          </ul>
        </li>
      }
    </>
  );
}

export default FavouriteListItem;
