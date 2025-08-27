/* eslint-disable react/prop-types */
export const Info = ({ label, value }) => (
  <div>
    <p className="font-semibold mb-1">{label}</p>
    <p>{value}</p>
  </div>
);

export const Detail = ({ title, content }) => (
  <div className="mb-4">
    <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-xs text-gray-600 leading-tight">{content}</p>
  </div>
);
