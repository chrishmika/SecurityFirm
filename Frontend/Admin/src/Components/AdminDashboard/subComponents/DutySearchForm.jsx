/* eslint-disable react/prop-types */

const DutySearchForm = ({ submitHandler, changeHandler, selectedCompanyName, companylist }) => {
  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-2 border-2 border-t-0 p-4 rounded-b-2xl">
        <div className="flex flex-col gap-1">
          <label>Year and Month</label>
          <input
            type="month"
            name="yearMonth"
            className="outline-1 w-fill rounded-md px-4 h-12"
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
            className="outline-1 w-fill rounded-md px-4 h-12 no-arrow"
            placeholder="Enter Name"
            onChange={changeHandler}
            // value={selectedCompanyName}
          />

          <datalist id="searchCompany">
            {Array.isArray(companylist) &&
              companylist.map((company) => <option key={company._id} value={company.name} />)}
          </datalist>
        </div>

        <div className="flex gap-1 mt-3">
          <input
            type="submit"
            value={`Search`}
            className="bg-green-200 hover:bg-green-400  w-md cursor-pointer rounded-md h-10"
          />

          <input
            type="reset"
            value={`Clear`}
            className="bg-red-200 hover:bg-red-400  w-2xs cursor-pointer rounded-md h-10"
          />
        </div>
      </form>
    </div>
  );
};

export default DutySearchForm;
