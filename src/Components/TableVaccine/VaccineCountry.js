import React, { Component } from "react";
import "../../App.css";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
const buildData = (data, tableData) => {
  let names = tableData.map((item) => {
    return item.country;
  });
  let new_data = data.map((item) => {
    let p = [];
    let timeline = item?.timeline;
    if (!timeline) {
      return null;
    }
    for (let k in timeline) {
      p.push({
        x: k,
        y: timeline[k],
      });
    }
    p.sort((current, next) => {
      let c = Date.parse(current.x);
      let n = Date.parse(next.x);
      return n.valueOf() - c.valueOf();
    });
    let d = {
      ...item,
      p,
      info: tableData[names.indexOf(item.country)]?.countryInfo.flag,
      cases: tableData[names.indexOf(item.country)]?.cases,
      deaths: tableData[names.indexOf(item.country)]?.deaths,
      recovered: tableData[names.indexOf(item.country)]?.recovered,
      todayCases: tableData[names.indexOf(item.country)]?.todayCases,
      todayDeaths: tableData[names.indexOf(item.country)]?.todayDeaths,
      todayRecovered: tableData[names.indexOf(item.country)]?.todayRecovered,
      population: tableData[names.indexOf(item.country)]?.population,
      active: tableData[names.indexOf(item.country)]?.active,
    };
    delete d.timeline;
    return d;
  });
  return new_data;
};
export default class VaccineCountry extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    dataTable: [],
  };
  async componentDidMount() {
    try {
      const responseDataTable = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/vaccine/coverage/countries"
      );
      let lastData = buildData(response.data, responseDataTable.data);
      this.setState({
        dataTable: lastData,
      });
    } catch (error) {
      console.log(error);
    }
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          ></Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    // console.log(this.state.dataTable)

    const columns = [
      {
        key: "country",
        title: "Country",
        dataIndex: "country",
        // width: 300,
        ...this.getColumnSearchProps("country"),
      },
      {
        key: "population",
        title: "Population",
        dataIndex: "population",
        // width: 300,
        ...this.getColumnSearchProps("population"),
        sorter: (a, b) => a.population - b.population,
        sortDirections: ["descend", "ascend"],
      },
      {
        key: "cases",
        title: "cases",
        dataIndex: "cases",
        // width: 300,
        // ...this.getColumnSearchProps('cases'),
        sorter: (a, b) => a.cases - b.cases,
        sortDirections: ["descend", "ascend"],
      },
      {
        key: "recovered",
        title: "Recovered",
        dataIndex: "recovered",
        // width: 300,
        // ...this.getColumnSearchProps('recovered'),
        sorter: (a, b) => a.recovered - b.recovered,
        sortDirections: ["descend", "ascend"],
      },
      {
        key: "deaths",
        title: "Deaths",
        dataIndex: "deaths",
        // width: 300,
        // ...this.getColumnSearchProps('deaths'),
        sorter: (a, b) => a.deaths - b.deaths,
        sortDirections: ["descend", "ascend"],
      },
      {
        key: "active",
        title: "Active",
        dataIndex: "active",
        // width: 300,
        // ...this.getColumnSearchProps('deaths'),
        sorter: (a, b) => a.active - b.active,
        sortDirections: ["descend", "ascend"],
      },
      {
        key: "todayCases",
        title: "TodayCases",
        dataIndex: "todayCases",
        // width: 300,
        // ...this.getColumnSearchProps('deaths'),
        sorter: (a, b) => a.todayCases - b.todayCases,
        sortDirections: ["descend", "ascend"],
      },
      {
        key: "todayDeaths",
        title: "TodayDeaths",
        dataIndex: "todayDeaths",
        // width: 300,
        // ...this.getColumnSearchProps('deaths'),
        sorter: (a, b) => a.todayDeaths - b.todayDeaths,
        sortDirections: ["descend", "ascend"],
      },
      {
        key: "todayRecovered",
        title: "TodayRecovered",
        dataIndex: "todayRecovered",
        // width: 300,
        // ...this.getColumnSearchProps('deaths'),
        sorter: (a, b) => a.todayRecovered - b.todayRecovered,
        sortDirections: ["descend", "ascend"],
      },
    ];
    return (
        <Table columns={columns} dataSource={this.state.dataTable} />
    )
  }
}
