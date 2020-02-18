import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Grid, Typography, Paper, InputBase, IconButton
} from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import './css/Todo.scss';


const useThisCustomHook = a => {
  const [value, setValue] = useState(a);

  useEffect(() => {
    setValue(value);
  }, [value]);

  return { value, setValue };
}

const App = props => {
  const { classes } = props;
  // const [val, setVal] = useState('');
  const input = useThisCustomHook('');
  const [tasks, setTasks] = useState( JSON.parse(localStorage.getItem('todoList')) || [] );

  // For adding new task
  const addTask = (value) => {
    if (value.trim()){
      tasks.push(value);
      setTasks(prev => [...tasks]);
    }
  };

  // For removing existing task
  const removeTask = (value) => {
    let afterRemove = _.pull(tasks, value);
    setTasks([...afterRemove]);
  };

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Grid container direction="row" justify="center">
      <Grid item xs={12} sm={12} md={11} lg={10}>
        <Paper className="Todo">
          <section className="Todo_header">
            <Typography variant='h3' gutterBottom className="Todo_header__title">
              Some title here
            </Typography>
            <Typography variant='overline' gutterBottom className="Todo_header__title-nobold">
              Some subtitle in here
            </Typography>
          </section>
          <section className="Todo_field">
            <Paper className="Todo_field__input">
              <InputBase
                placeholder='Some placeholder here'
                inputProps={{ 'aria-label': 'Add new task' }}
                className="Todo_field__input_base"
                value={input.value}
                onChange={(evt) => input.setValue(evt.target.value)}
              />
              <IconButton className="Todo_field__input_btn" aria-label="Add task" onClick={() => {addTask(input.value); input.setValue('')}}>
                <Add />
              </IconButton>
            </Paper>
          </section>
          <section className="Todo_list">
            {
              tasks.map((task, idx) => (
                <Paper key={'task_' + idx} className="Todo_list__item">
                  <div className="Todo_list__item_text">
                    <Typography variant='overline' gutterBottom>
                      {task}
                    </Typography>
                  </div>
                  <div className="Todo_list__item-close">
                    <IconButton onClick={() => removeTask(task)}>
                      <Close />
                    </IconButton>
                  </div>
                </Paper>
              ))
            }
          </section>
          <section className="Todo_footer">
            <Typography variant='overline' gutterBottom className="Todo_footer__text">
              {'© 2019 Fred A'}
            </Typography>
          </section>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;