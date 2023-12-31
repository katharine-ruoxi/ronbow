import React, { useState } from 'react';
import { Input, List, Button, Checkbox, Divider, DatePicker, Tag, Select, } from 'antd';
import moment from 'moment';
import './Dashboard.css';
import { ExportOutlined, FilterOutlined, SearchOutlined, DownloadOutlined, 
  ToolOutlined, PrinterOutlined, MailOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';
import IndustryNews from './IndustryNews/IndustryNews';
import SalesTargetBar from './SalesTargetBar/SalesTargetBar';
import CardList from './CardList/CardList';


const dateFormat = 'YYYY/MM/DD';

const App = () => {
  const [todos, setTodos] = useState([
    {text: <a href="./project-list/proj/624748504" target="_blank">Kevin's Kitchen - Palo Alto</a>, tag: 'Project', completed: 'false', deadline: dayjs('2023/10/01', dateFormat) },
    {text: <a href="https://calendar.google.com/calendar/u/0/r" target="_blank">John's Wet Bar - San Mateo</a>, tag:'New Leads', completed: 'false', deadline: dayjs('2023/10/03', dateFormat) },
    {text: <a href="https://designstudio.ronbow.com/" target="_blank">Kitty's Closet - Cupertino</a>, tag: 'Meeting', completed: 'false', deadline: dayjs('2023/10/05', dateFormat) },
  ]);
  const [input, setInput] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  const addTodo = () => {
    if (input) {
      setTodos([...todos, { text: input, completed: false, deadline: null }]);
      setInput('');
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const setDeadline = (index, date) => {
    const newTodos = [...todos];
    newTodos[index].deadline = date;
    setTodos(newTodos);
  };
  const [viewOption, setViewOption] = useState('Current Month');

  const displayedTodos = showCompleted ? todos : todos.filter(todo => !todo.completed);

  return (
    <div style={{ maxWidth: '90%', margin: '50px auto',}}>

      {/* the progress bar starts here */}
      <div style={{ padding: "50px" }}>
        <h2>Hi XXX, together we shape the future, one design at a time.</h2>
        <SalesTargetBar
          sales={4000}
          target={10000}
          elapsedDays={9}
          totalDays={30}
        />
      </div>

      <Divider />
      
      <div  style={{ display: 'flex',  justifyContent: 'center', flexDirection: 'row', width: '100%', }}>

        <div style={{ float: 'left', marginRight: '20px', float: 'left', width: '65%', }}>
        <div style={{   justifyContent: 'center', flexDirection: 'row', maxWidth: '1000px', }}>
        <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Your Todo</h1>
        <div style={{ display: 'flex', }}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            onPressEnter={addTodo}
            style={{ height: '40px'}}
          />
          <Button onClick={addTodo} type="primary" style={{ height: '40px', marginLeft: '5px', backgroundColor: '#5D6465', }}>
            +
          </Button>
          <Button onClick={toggleShowCompleted} type="primary" 
                  style={{ height: '40px', marginLeft: '5px', backgroundColor: 'white', 
                          color: '#5D6465', borderColor: '#5D6465'}}>
            {showCompleted ? 'Hide Completed' : ' Show All Tasks '}
          </Button>

        </div>

        <List
          style={{ marginTop: '20px', borderRadius: '0px', }}
          bordered={false}
          dataSource={displayedTodos}
          locale={{ emptyText: 'Add your first task!' }}
          renderItem={(todo, index) => (
              <List.Item>
                  <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                  >
                  {todo.text}
                  </Checkbox>
                  <div>
                    <Select
                      defaultValue={""}
                      value={todo.tag}
                      style={{
                        width: 150,
                      }}
                      allowClear
                      options={[
                        {
                          value: 'new_leads',
                          label: 'New Leads',
                        },
                        {
                          value: 'finalize_design',
                          label: 'Finalize Design',
                        },
                        {
                          value: 'project',
                          label: 'Project',
                        },
                      ]}
                    />
                    <DatePicker
                    value={todo.deadline}
                    onChange={(date) => setDeadline(index, date)}
                    className={
                        todo.deadline && moment(todo.deadline).isBefore(moment("2023/10/10")) 
                        ? 'redDate' 
                        : ''
                    }
                    style={{ marginLeft: '15px' }}
                    />
                  </div>
              </List.Item>
            )}
        />
      </div>

    </div>
        
      
        
        <div style={{ fontFamily: 'Roboto, sans-serif', width: '30%', marginLeft: '20px', float: 'right', }}>
          <h2>Announcement</h2>
          <ul>
            <li>Product: Vertical Gola is now available. 
              <a href="https://www.ronbow.com/products" target="_blank"> 
                <ExportOutlined />
                <span style={{ color: 'red', marginLeft: '10px', fontSize: '14px', }}>
                  New
                </span>
              </a>
            </li>
            <li>HR: We're actively hiring designers！
              <a href="https://www.indeed.com/cmp/Ronbow-Corporation-1/jobs?jk=72d3f937c6debc6d&start=0&clearPrefilter=1" target="_blank"> 
                <ExportOutlined />
                <span style={{ color: 'red', marginLeft: '10px', fontSize: '14px', }}>
                  New
                </span>
              </a>
            </li>
            <li>...</li>
            <li>... </li>
            <li>...</li>
            <li>... </li>
            <li>...</li>
          </ul>
        </div>

      </div>
      
      <Divider />

      <div>

        <CardList viewOption={viewOption} setViewOption={setViewOption} />
        
        <Divider />

        <IndustryNews />

      </div>
      
      
    </div>
  );
};

export default App;
