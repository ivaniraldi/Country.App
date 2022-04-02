import s from "./AddActivity.module.css";

const sivityView = ({
  errors,
  countries,
  handlerOnChange,
  handlerOnChangeCountries,
  handlerSubmit,
  RemoveCountry,
  InputActivity,
  InputCountries,
}) => {
  return (
    <div className={s.formulario}>
      <div>
        <form onSubmit={handlerSubmit}>
          <label>Activity Name </label>

          <input className={s.inputed}
            name="name"
            value={InputActivity.name}
            autoComplete="off"
            onChange={handlerOnChange}
            required
          />
          <div>
            <label> Duration (in days):</label>

            <input
            className={s.inputed}
              name="duration"
              type="number"
              min="1"
              max="365"
              value={InputActivity.duration}
              onChange={handlerOnChange}
              required
            />

            <label>Difficulty:</label>

            <select
            className={s.inputed}
              name="difficulty"
              id="difficulty1"
              onChange={handlerOnChange}
              value={InputActivity.difficulty}
              required
            >
              <option value="" />
              <option value={1}>1 (very easy)</option>
              <option value={2}>2 (easy)</option>
              <option value={3}>3 (medium)</option>
              <option value={4}>4 (hard)</option>
              <option value={5}>5 (very hard)</option>
            </select>
          </div>

          <label>Season:</label>

          <select
          className={s.inputed}
            name="season"
            id="season1"
            onChange={handlerOnChange}
            value={InputActivity.season}
          >
            <option value="" />
            <option value="Winter">Winter</option>
            <option value="Autumn">Autumn</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
          </select>

          <label>Select Country:</label>

          <select
          className={s.inputed}
            name="country"
            id="country1"
            onChange={handlerOnChangeCountries}
            value=""
          >
            <option value="" />
            {countries &&
              countries.map((el) => (
                <option value={el.code + " " + el.name} key={el.code}>
                  {el.name}
                </option>
              ))}
          </select>

          {InputActivity.changed &&
          !errors.name &&
          !errors.country &&
          !errors.difficulty &&
          !errors.season &&
          !errors.duration ? (
            <button className={s.buttonCreate} type="submit">
              Create
            </button>
          ) : (
            <button
              className={s.buttonCreateDisabled}
              disabled
              type="submit"
            >
              Create
            </button>
          )}

          <div className={s.selected}>
            {InputCountries
              ? InputCountries.map((el) => (
                  <p key={el.id} className={s.selectedItem}>
                    {" "}
                    {el.name}
                    <button
                      className={s.buttonDelete}
                      type="button"
                      onClick={() => RemoveCountry(el.id)}
                    >
                      X
                    </button>{" "}
                  </p>
                ))
              : null}
          </div>
        </form>
      </div>
      <div className={s.errors} />
      {errors.country && InputActivity.changed ? (
        <span className={s.err}> -{errors.country}- </span>
      ) : null}
      {errors.name && <span className={s.err}> -{errors.name}- </span>}
      {errors.duration && (
        <span className={s.err}>-{errors.duration}-</span>
      )}
      {errors.season ? (
        <span className={s.err}>-{errors.season}-</span>
      ) : null}
      {errors.difficulty ? (
        <span className={s.err}> {errors.difficulty} </span>
      ) : null}
    </div>
  );
};

export default sivityView;
