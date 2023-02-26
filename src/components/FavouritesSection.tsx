import { Card, CardContent } from '@mui/material';
import { Favourite } from '../types/Favourite';
import FavouriteListItem from '../FavouriteListItem';

function FavouritesSection({ favourites }: {favourites: Favourite[]}) {
  return (
    <Card sx={{ marginLeft: '16px' }}>
      <CardContent>
        <div className="favourite-bday-body">
          <h1 className="header">Favourite Birthdays</h1>
          <ul className="list">
            {(favourites as Favourite[]).map((date, index) => (
              <FavouriteListItem key={index} date={date} />
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default FavouritesSection;
