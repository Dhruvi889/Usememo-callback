
import { useCallback, useEffect, useMemo, useState } from "react"
import { Dropdown, Button, MenuProps, Space, Form, Input, Table } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './App.css';


export const App = () => {
  const [person, setPerson] = useState({ fname: "", lname: "", age: "", email: "" });
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || [])
  const [sortField, setsortField] = useState("fname");
  const [sortOrder, setsortOrder] = useState(true);
  const [searchTerm, setsearchTerm] = useState("");
  const [searchField, setsearchField] = useState("fname");

  const handleOnChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value })
  }
  // for managing side effects 
  useEffect(() => {
    console.log("hello");
  }, [person.lname, person.age]);

  // returns a variable 
  const getColor = useMemo(() => {
    if (person.fname === "test") {
      return "red"
    }
    else if (person.fname === "hello") {
      return "blue"
    }
    else if (person.fname === "demo") {
      return "green"
    }
    else return "yellow"
  }, [person.fname])

  // return functions 
  const getBackgroundColor = useCallback((value) => {
    if (value === 0) {
      return "red"
    }
    else if (value === 1) {
      return "green"
    }
    else if (value === 2) {
      return "blue"
    }
    else return "orange"
  }, [])


  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const valueA = a[sortField] ? a[sortField].toString().toLowerCase() : "";
      const valueB = b[sortField] ? b[sortField].toString().toLowerCase() : "";

      // Use localeCompare for string fields

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);

      }
      // Handle non-string fields (like numbers)
      if (valueA > valueB) return sortOrder ? 1 : -1;
      if (valueA < valueB) return sortOrder ? -1 : 1;
      return 0;
    });

    return sorted;

  }, [data, sortField, sortOrder]);

  const hanldesorting = () => {
    setsortOrder(!sortOrder);
  }

  const handleSortFieldChange = (e) => {
    setsortField(e.key);
  }

  const filteredData = useMemo(() => {
    return sortedData.filter((item) => {
      const value = item[searchField];
      if (value !== undefined && value !== null) {

        return value.toString().toLowerCase().includes(searchTerm.toLowerCase());

      }

    });

  }, [sortedData, searchField, searchTerm])


  const handleSearchFieldChange = (e) => {
    setsearchField(e.key);
  }

  const menuSortItems: MenuProps['items'] = [
    {
      label: 'Fname',
      key: 'fname',
      icon: <UserOutlined />,
    },
    {
      label: 'Lname',
      key: 'lname',
      icon: <UserOutlined />,
    },
    {
      label: 'Age',
      key: 'age',
      icon: <UserOutlined />,

    },
    {
      label: 'Email',
      key: 'email',
      icon: <UserOutlined />,

    },
  ];


  const menuSearchItems: MenuProps['items'] = [
    {
      label: 'Fname',
      key: 'fname',
      icon: <UserOutlined />,
    },
    {
      label: 'Lname',
      key: 'lname',
      icon: <UserOutlined />,
    },
    {
      label: 'Age',
      key: 'age',
      icon: <UserOutlined />,

    },
    {
      label: 'Email',
      key: 'email',
      icon: <UserOutlined />,

    },
  ];

  const columns = [
    {
      title: 'Fname',
      dataIndex: 'fname',
      key: 'fname',
      
    },
    {
      title: 'Lname',
      dataIndex: 'lname',
      key: 'lname',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ]

  return (


    <div>
      <Form
        labelCol={{
          span: 8,
        }}
        style={{
          maxWidth: 500,
        }}>

        <h1 className="foms">form</h1>
        <div>
          <Form.Item label="Firstname">
            <Input name="fname" onChange={handleOnChange} />
          </Form.Item>

          <Form.Item label="Lastname">
            <Input name="lname" onChange={handleOnChange} />
          </Form.Item>
          <Form.Item label="Age">
            <Input type="number" name="age" onChange={handleOnChange} />
          </Form.Item>
          <Form.Item label="Email">
            <Input name="email" onChange={handleOnChange} />

          </Form.Item>


          <Button onClick={() => {
            setData([...data, person]);
            localStorage.setItem("data", JSON.stringify([...data, person]));
            setPerson({ fname: "", lname: "", age: "", email: "" });
          }}>Submit</Button><br />

          <Dropdown menu={{ items: menuSortItems, onClick: handleSortFieldChange }}>

            <Button >
              <Space>
                {sortField}
                <DownOutlined />
              </Space>

            </Button>
          </Dropdown>

          <Button onclick={hanldesorting}> Sorting</Button><br />

          <Dropdown menu={{ items: menuSearchItems, onClick: handleSearchFieldChange }}>
            <Button>
              <Space>
                {searchField}
                <DownOutlined />
              </Space>

            </Button>
          </Dropdown>
          <input type="text" placeholder="search" onChange={(e) => setsearchTerm(e.target.value)} />
          <Button>Searching</Button>

        </div>
        {/* <h1 style={{ color: getColor }}>Hello HTML</h1> */}

      </Form>
      <Table columns={columns} dataSource={filteredData} />
    </div>

  )

}

export default App;









