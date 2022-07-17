import React,{ Component }  from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import Table from "@material-ui/core/Table";
// import TableRow from "@material-ui/core/TableRow";
// import TableHead from "@material-ui/core/TableHead";
// import TableContainer from "@material-ui/core/TableContainer";
// import Paper from "@material-ui/core/Paper";
// import NumberFormat from "react-number-format";
// import SearchVaccine from "../Search/SearchVaccine";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
// const useStyles = makeStyles({
//   table: {
//     minWidth: 350,
//   },
//   font: {
//     fontFamily: "Nunito",
//   },
// });
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
    // for (let k in timeline) {
    //   p.push({
    //     x: k,
    //     y: timeline[k],
    //   });
    // }
    for (let k in timeline) {
      p.push(
        timeline[k]
      );
    }
    p.sort((current, next) => {
      let c = Date.parse(current.x);
      let n = Date.parse(next.x);
      return n.valueOf() - c.valueOf();
    });
    let tmp = p[0]
    let d = {
      ...item,
      tmp,
      p,
      info: tableData[names.indexOf(item.country)]?.countryInfo.flag,
      population: tableData[names.indexOf(item.country)]?.population,
    };
    delete d.timeline;
    return d;
  });
  return new_data;
};

export default class  VaccineTableCountry extends Component{
  state={
    searchText: "",
    searchedColumn: "",
    dataTable: [],
  }
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
    const columns = [
      {
        key: "country",
        title: "Country",
        dataIndex: "country",
        ...this.getColumnSearchProps("country"),
      },
      {
        key: "population",
        title: "Population",
        dataIndex: "population",
        ...this.getColumnSearchProps("population"),
        sorter: (a, b) => a.population - b.population,
        sortDirections: ["descend", "ascend"],
      },
      {
        key: "tmp",
        title: "Vaccine",
        dataIndex: "tmp",
        ...this.getColumnSearchProps("tmp"),
        sorter: (a, b) => a.tmp - b.tmp,
        sortDirections: ["descend", "ascend"],
      },
      
    ];
    return (
        <Table columns={columns} dataSource={this.state.dataTable} />
    )
  }
  // OnSearchVaccine,
  // searchVaCCine,
  // value,
  // tableData,
} 
  // const [dataTable, setDataTable] = useState([]);
  // const classes = useStyles();
  // useEffect(() => {
  //   fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       let lastData = buildData(data, tableData);
  //       setDataTable(lastData);
  //     });
  // }, [tableData]);
  

