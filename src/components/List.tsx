import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Task from './Task';
import { List as ListProps, useCreateTaskMutation } from '../graphql/generated';
import FocusInput from './FocusInput';

const ListWrapper = styled.div`
  padding: 16px;
  background-color: #c2c2c2;
  color: #3b3b3b;
  min-width: 320px;
  max-width: 320px;
  margin-right: 16px;
  border-radius: 4px;

  .list-footer {
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    p { padding-left: 8px; }
    :hover {
      background-color : #a5a5a5;
    }
  }
`;

export default function List(props: ListProps){

  const [isAdding, setIsAdding] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState(props.tasks);
  const [createTask, { data, loading }] = useCreateTaskMutation();

  useEffect(() => {
    if (data){
      const { createTask: { id, name } } = data;
      setTasks([...tasks, { id, name }]);
      setIsAdding(false);
      setTaskName('');
    }
  }, [data]);

  return (
    <ListWrapper >
      <div>
        <p>{props.name}</p>
      </div>
      <div>
        {tasks.map(task => <Task key={task.id} {...task}/>)}
        {isAdding ? 
        <form className='add-form' onSubmit={e => { e.preventDefault(); createTask({ variables: { task: { name: taskName, listId: props.id } } }); }}>
          <FocusInput 
            value={taskName} 
            onChange={e => setTaskName(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && setIsAdding(false)}/>
        </form> : 
        <div className='list-footer' onClick={() => setIsAdding(true)}>
          <AddBoxIcon/>
          <p>Add item</p>
        </div>}
      </div>
    </ListWrapper>
  );

}
