import { RegularTextField } from "../../../components/TextFields";
import CountrySelect from "../../../components/CountriesDropdown";
const SecondStep = ({
  fullName,
  handleFullNameChange,
  location,
  handleLocationChange,
  description,
  handleDescriptionChange,
}) => {
  return (
    <>
      <RegularTextField
        label="Full Name"
        value={fullName}
        onChange={handleFullNameChange}
        placeholder="Enter full name"
      />

      <CountrySelect
        label="Location"
        value={location}
        onChange={handleLocationChange}
        placeholder="Enter location"
      />
      <RegularTextField
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter description"
        marginTop={"20px"}
      />
    </>
  );
};

export default SecondStep;
