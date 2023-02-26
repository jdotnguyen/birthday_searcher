import { createContext, useReducer } from 'react';

const initialState: any = {
  favourites: [],
  birthdays: [],
  filteredBirthdays: []
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children }: { children: any } ) => {
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch(action.type) {
      case 'saveFavourite':
        return {...state,
          favourites: action.data
        };
      case 'saveBirthdays':
        return {...state,
          birthdays: action.data
        };
      case 'saveFilteredBirthdays':
        return {...state,
          filteredBirthdays: action.data
        };
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }