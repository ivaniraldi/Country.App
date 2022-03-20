const initialState = {
  countries: [],
  filterCountries: [],
  actividades: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        filterCountries: action.payload,
        countries: action.payload,
      };

    case "GET_COUNTRY_BY_NAME":
      return {
        ...state,
        filterCountries: action.payload,
      }

    case "ORDER_BY_NAME": {
      return {
        ...state,
        filterCountries: [...state.filterCountries]?.sort((a, b) => {
          if (a.name < b.name) {
            return action.payload === "ASC" ? -1 : 1;
          }
          if (a.name > b.name) {
            return action.payload === "ASC" ? 1 : -1;
          }
          return 0;
        })
      }
    }

    case "ORDER_BY_CONTINENT":
      return {
        ...state,
        filterCountries: state.countries.filter(e => e.continent === action.payload)
      }

    case "GET_ACTIVIDADES":
      return {
        ...state,
        actividades: action.payload
      }

    case "ORDER_BY_ACTIVITY":
      return {
        ...state,
        filterCountries: state.countries.filter(country => {
          const activities = country.activities.map((activity) => String(activity.id));
          return activities.includes(action.payload);
        })
      }

    case "ORDER_BY_AREA":
      return {
        ...state,
        filterCountries: [...state.countries]?.sort((a, b) => {
          if (a.area < b.area) {
            return action.payload === "MAX" ? 1 : -1;
          }
          if (a.area > b.area) {
            return action.payload === "MAX" ? -1 : 1;
          }
          return 0;

        })
      }


    default:
      return {
        state,
      };
  }
};

export default reducer;