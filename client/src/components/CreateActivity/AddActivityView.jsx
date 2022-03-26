import addACt from './AddActivity.module.css'

const AddActivityView = ({ errors, countries, handlerOnChange, handlerOnChangeCountries, handlerSubmit, RemoveCountry, InputActivity, InputCountries }) => {
  return (

    <div className={addACt.formulario}>
      <div>
        <form onSubmit={handlerSubmit}>

          <label>Activity Name </label>

          <input name='name' value={InputActivity.name} autoComplete='off' onChange={handlerOnChange} required />
          <div>

            <label> Duration</label>

            <input name='duration' type='number' min='1' max='365' value={InputActivity.duration} onChange={handlerOnChange} required />

            <label>Difficulty</label>

            <select name='difficulty' id='difficulty1' onChange={handlerOnChange} value={InputActivity.difficulty} required>
              <option value='' />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>

          </div>

          <label>Season</label>

          <select name='season' id='season1' onChange={handlerOnChange} value={InputActivity.season}>
            <option value='' />
            <option value='Winter'>Winter</option>
            <option value='Autumn'>Autumn</option>
            <option value='Spring'>Spring</option>
            <option value='Summer'>Summer</option>
          </select>

          <label>Select Country</label>

          <select name='country' id='country1' onChange={handlerOnChangeCountries} value=''>
            <option value='' />
            {countries && countries.map(el => (<option value={el.code + ' ' + el.name} key={el.code}>{el.name}</option>))}
          </select>

          {InputActivity.changed && !errors.name && !errors.country && !errors.difficulty && !errors.season && !errors.duration
            ? (
              <button className={addACt.buttonCreate} type='submit'>Create</button>
              )
            : <button className={addACt.buttonCreateDisabled} disabled type='submit'>Create</button>}

          <div className={addACt.selected}>

            {InputCountries ? InputCountries.map((el) => (<p key={el.id} className={addACt.selectedItem}>  {el.name}<button className={addACt.buttonDelete} type='button' onClick={() => RemoveCountry(el.id)}>X</button> </p>)) : null}
          </div>
        </form>
      </div>
      <div className={addACt.errors} />
      {errors.country && InputActivity.changed ? <span className={addACt.err}> -{errors.country}- </span> : null}
      {errors.name && <span className={addACt.err}> -{errors.name}- </span>}
      {errors.duration && <span className={addACt.err}>-{errors.duration}-</span>}
      {errors.season ? <span className={addACt.err}>-{errors.season}-</span> : null}
      {errors.difficulty ? <span className={addACt.err}> {errors.difficulty} </span> : null}
    </div>

  )
}

export default AddActivityView
