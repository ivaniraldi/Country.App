/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountries } from "../../actions/actions";


const SivityView = ({
  errors,
  handlerOnChange,
  countries,
  handlerOnChangeCountries,
  handlerSubmit,
  RemoveCountry,
  InputActivity,
  InputCountries,
}) => {
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  return (
    <div className="container">
      <div>
        <form onSubmit={handlerSubmit} className="row g-3">
          <div className="col-12">
          <label className="form-label">Activity Name </label>

          <input
            className="form-control"
            name="name"
            value={InputActivity.name}
            autoComplete="off"
            onChange={handlerOnChange}
            required
          />
          </div>
          <div className="col-md-6">
            <label className="form-label"> Duration (in days):</label>

            <input
              className="form-control"
              name="duration"
              type="number"
              min="1"
              max="365"
              value={InputActivity.duration}
              onChange={handlerOnChange}
              required
            />
            </div >
            <div className="col-md-6">
            <label className="form-label">Difficulty:</label>

            <select
              className="form-control"
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
          </div >
          <div className="col-md-6">
          <label className="form-label">Season:</label>

          <select
            className="form-control"
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
          </div>
          <div className="col-md-6">
          <label className="form-label">Select Country:</label>

          <select
            className="form-select"
            name="country"
            id="country1"
            onChange={handlerOnChangeCountries}
            value=""
          >
            <option value="" />
            {countries &&
              countries.map((el, i) => (
                <option key={i} value={el.code + " " + el.name}>
                  {el.name}
                </option>
              ))}
          </select>
          </div>

          <div className="col-12 d-flex justify-content-center mt-3">
            {InputCountries
              ? InputCountries.map((el) => (
                  <p key={el.id} className="btn btn-light">
                    {" "}
                    {el.name}
                    <button
                      className="btn btn-danger"
                      style={{marginLeft:"10px"}}
                      type="button"
                      onClick={() => RemoveCountry(el.id)}
                    >
                      X
                    </button>{" "}
                  </p>
                ))
              : null}
          </div>
          {InputActivity.changed &&
          !errors.name &&
          !errors.country &&
          !errors.difficulty &&
          !errors.season &&
          !errors.duration ? (
            <div className="col-12 d-flex justify-content-center">
            <button className="btn btn-success btn-lg d-flex justify-content-center" type="submit">
              Create
            </button>
            </div>
          ) : (
            <div className="col-12 d-flex justify-content-center">
            <button className="btn btn-secondary btn-lg d-flex justify-content-center" disabled type="submit">
              Create
            </button>
            </div>
          )}

        </form>
      <div  />
      {errors.country && InputActivity.changed ? (
        <span> -{errors.country}- </span>
      ) : null}
      {errors.name && <span> -{errors.name}- </span>}
      {errors.duration && <span>-{errors.duration}-</span>}
      {errors.season ? <span>-{errors.season}-</span> : null}
      {errors.difficulty ? (
        <span> {errors.difficulty} </span>
      ) : null}
    </div>
      </div>
      
  );
};

export default SivityView;
