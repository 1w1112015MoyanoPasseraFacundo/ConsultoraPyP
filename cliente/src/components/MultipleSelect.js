import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

export const Multipleselect = ({ options, setState, defaultOption, value }) => {
  const optionsGeneric = useMemo(
    () =>
      options.map((e) => {
        return { value: e.idCompetencia, label: e.nombre };
      }),
    [options]
  );

  const onDropdownChange = (value) => {
    setState(value);
    // setSelectedOptions(value);
  };
  // const [selectedOptions, setSelectedOptions] = useState([]);

  // useEffect(() => {
  //   setState(selectedOptions.map((e) => e.value));
  // }, [selectedOptions, setState]);

  // const optionsGeneric = useMemo(
  //   () =>
  //     options.map((e) => {
  //       console.log("E", e);
  //       return { value: e.idCompetencia, label: e.nombre };
  //     }),
  //   [options]
  // );

  // const handleSelect = (data) => {
  //   setSelectedOptions(data);
  // };

  // useEffect(() => {
  //   setSelectedOptions([]);
  // }, [options]);

  // useEffect(() => {
  //   if (values !== undefined) {
  //     setSelectedOptions(values);
  //   }
  // }, []);
  return (
    <div>
      <Select
        isMulti
        value={value}
        // value={selectedOptions}
        options={optionsGeneric}
        // onChange={handleSelect}
        onChange={onDropdownChange}
        placeholder={defaultOption}
        defaultValue={optionsGeneric[0]}
        isSearchable={true}
        closeMenuOnSelect={false}
      />
    </div>
  );
};
