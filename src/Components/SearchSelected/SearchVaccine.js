import React from "react";
import { Select } from "antd";
import { FormControl } from "@material-ui/core";
const { Option } = Select;

export default function SearchVaccine({ countries, onVaccineChange, value  }) {
  return (
    <FormControl>
      <Select
        value={value}
        onChange={onVaccineChange}
        showSearch
        style={{ width: 330 }}
        placeholder="Search Country"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
      >
        <Option value="Worldwide">Worldwide</Option>
        {countries.map((country, index) => {
          return (
            <Option value={country.value} key={index}>
              {country.name}
            </Option>
          );
        })}
      </Select>
    </FormControl>
  );
}
