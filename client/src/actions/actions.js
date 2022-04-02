import axios from 'axios'


export function getCountries(){
    return async function(dispatch){
        const country = await axios.get('/countries')
        dispatch({
            type: 'GET_COUNTRIES',
            payload: country.data
        })
    }
}


export function getCountryByName(name){
    return async function(dispatch){
        const country = await axios.get(`/countries/?name=${name}`)
        dispatch({
            type: 'GET_COUNTRY_BY_NAME',
            payload: country.data
        })
    }
}


export function orderByName(type){
    return async function(dispatch){        
        dispatch({
            type: 'ORDER_BY_NAME',
            payload: type
        })
    }
}


export function orderByContinent(type){
    return async function(dispatch){        
        dispatch({
            type: 'ORDER_BY_CONTINENT',
            payload: type
        })
    }
}

export function createActivity(type){
  return async function(dispatch){
    dispatch({
      type: 'CREATE_ACTIVITY',
      payload: type
    })
  }
}

export function orderByActivity(type){
    return async function(dispatch){        
        dispatch({
            type: 'ORDER_BY_ACTIVITY',
            payload: type
        })
    }
}

export function getActividades(){
    return async function (dispatch) {
        try{
            const request = await axios(`/activity`)
            dispatch({
                type: "GET_ACTIVIDADES", 
                payload: request.data
            })
        }catch(err){
            console.log(err)
        }
    }
}


export function orderByArea(type){
    return async function(dispatch){        
        dispatch({
            type: 'ORDER_BY_AREA',
            payload: type
        })
    }
}
export function orderByPopulation(type){
    return async function(dispatch){        
        dispatch({
            type: 'ORDER_BY_POPULATION',
            payload: type
        })
    }
}
export function topFive(type){
    return async function(dispatch){
        dispatch({
            type: "TOP_FIVE",
            payload: type
        })
    }
}