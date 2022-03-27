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
      if(action.payload === "continent"){
        return{
          ...state,
          filterCountries: state.countries
        }
      }
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
      const status = state.countries
      const mapedStatus = status.map((country) => {
        return {
          ...country,
          activities: country.activities.map(e => e.name)
        }
      })
      const filtered = action.payload === "all" ? status : mapedStatus.filter(e => e.activities.includes(action.payload))
      return {
        ...state,
        filterCountries: filtered
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
      case "ORDER_BY_POPULATION":
        return {
          ...state,
          filterCountries: [...state.countries]?.sort((a, b) => {
            if (a.population < b.population) {
              return action.payload === "MAX" ? 1 : -1;
            }
            if (a.population > b.population) {
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