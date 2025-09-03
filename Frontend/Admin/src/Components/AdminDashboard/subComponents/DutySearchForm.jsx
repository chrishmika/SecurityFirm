/* eslint-disable react/prop-types */

const DutySearchForm = ({
  submitHandler,
  changeHandler,
  selectedCompanyName,
  companylist,
  submitHandler2,
}) => {
  return (
    <div>
      <form
        onSubmit={submitHandler || submitHandler2}
        className="flex flex-col gap-2 border-3 p-4 rounded-2xl">
        <div className="flex flex-col gap-1">
          <label>Year and Month</label>
          <input
            type="month"
            name="yearMonth"
            className="outline-1 w-fill rounded-md px-4 h-10"
            placeholder="Enter Data"
            onChange={changeHandler}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Company</label>

          <input
            list="searchCompany"
            name="companyName"
            className="outline-1 w-fill rounded-md px-4 h-10 no-arrow"
            placeholder="Enter Data"
            onChange={changeHandler}
            value={selectedCompanyName}
          />

          <datalist id="searchCompany">
            {Array.isArray(companylist) &&
              companylist.map((company) => <option key={company._id} value={company.name} />)}
          </datalist>
        </div>

        <div className="flex gap-1">
          <input
            type="submit"
            value={`submit`}
            className="bg-green-200 w-md cursor-pointer rounded-md h-10"
          />

          <input
            type="reset"
            value={`Clear`}
            className="bg-red-200 w-2xs cursor-pointer rounded-md h-10"
          />
        </div>
      </form>
    </div>
  );
};

export default DutySearchForm;
