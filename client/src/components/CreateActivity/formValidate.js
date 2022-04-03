function validate(value, target, setErrors) {
  if (target === 'name') {
    setErrors((prev) => ({ ...prev, name: null }))
    const nameformat = /^[a-zA-Z ]{3,15}$/
    if (!value) {
      setErrors((prev) => ({ ...prev, name: 'Name is required' }))
    } else if (!value.match(nameformat)) {
      setErrors((prev) => ({ ...prev, name: 'Name is invalid' }))
    }
  }
  if (target === 'duration') {
    setErrors((prev) => ({ ...prev, duration: null }))
    if (!value) {
      setErrors((prev) => ({ ...prev, duration: 'Duration is required' }))
    }
    if (value <= 0) {
      setErrors((prev) => ({ ...prev, duration: 'Duration must be greater than 0' }))
    }
  }
  if (target === 'difficulty') {
    const valuesarr = ['1', '2', '3', '4', '5']
    setErrors((prev) => ({ ...prev, difficulty: null }))
    if (value === '') {
      setErrors((prev) => ({ ...prev, difficulty: 'Difficulty is required' }))
    } else if (!valuesarr.includes(value)) {
      setErrors((prev) => ({ ...prev, difficulty: 'Difficulty must be between 1 and 5' }))
    }
  }
  if (target === 'season') {
    setErrors((prev) => ({ ...prev, season: null }))
    if (value === '') {
      setErrors((prev) => ({ ...prev, season: 'Season is required' }))
    }
  }
}

function validateCountries(value, setErrors) {
  if (value.length === 0) setErrors((prev) => ({ ...prev, country: 'Must include a country' }))
  if (value.length > 0) setErrors((prev) => ({ ...prev, country: null }))
}

export { validate, validateCountries }