import { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { addTask, ListResponse } from '../api';
import { ListContext } from '../App';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Task from './Task';

const ListWrapper = styled.div<{ isAdding: boolean }>`
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

  .add-form {
    display: ${({ isAdding }) => isAdding ? 'block' : 'none'};
  }

`;


export default function List(props: ListResponse){

  const { lists, setLists } = useContext(ListContext);
  const [isAdding, setIsAdding] = useState(false);
  const [taskName, setTaskName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsAdding(true);
    if (inputRef.current){
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask({ name: taskName, list: props.id }, (res) => {
      setLists(lists.map(list => {
        if (list.id === props.id) {
          list.tasks = [...list.tasks, res];
        }
        return list;
      }));
      setIsAdding(false);
      setTaskName('');
    });
  };

  return (
    <ListWrapper isAdding={isAdding}>
      <div>
        <p>{props.name}</p>
      </div>
      <div>
        {props.tasks.map(task => (
          <Task key={task.id} {...task} listId={props.id}/>
        ))}
        <form className='add-form' onSubmit={handleSubmit}>
          <input 
            ref={inputRef} 
            value={taskName} 
            onChange={e => setTaskName(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && setIsAdding(false)}/>
        </form>
      </div>
      <div className='list-footer' onClick={handleClick}>
        <AddBoxIcon />
        <p>Add item</p>
      </div>
      
    </ListWrapper>
  );

}
