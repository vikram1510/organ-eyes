import styled, { css } from 'styled-components';
import { deleteTask, TaskResponse, updateTask } from '../api';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useContext, useRef, useState } from 'react';
import { ListContext } from '../App';

const hoverStyles = css`
    background-color: #f8ddaa;
    border: 2px solid #a5a5a5;
`;

const TaskWrapper = styled.div<{ isEdit: boolean }>`
  background-color: wheat;
  border: 2px solid wheat;
  padding: 12px;
  margin: 16px 0;
  border-radius: 8px;
  cursor: pointer;
  ${props => props.isEdit && hoverStyles}

  svg { visibility: hidden }

  :hover  {
    ${hoverStyles}
    svg { visibility: ${({ isEdit }) => isEdit ? 'hidden' : 'visible'  }; }
  }

  .task-icons {
    display: flex;
  }


  svg {
    padding: 4px;
    border-radius: 8px;
    :hover{
      background-color: #fbc55f;
    }
  }

  form {
    display: flex;
    justify-content: space-between;

    p {
      display: ${({ isEdit }) => isEdit ? 'none' : 'block'  };
    }

    input {
      display: ${({ isEdit }) => isEdit ? 'block' : 'none'  };
      background-color: #ffc250;
      padding: 2px;
      border: 0;
      :focus {
        outline: none;
      }
    }
  }
`;

export type TaskProps = { name: string, list: number }

export default function Task(props: TaskResponse & { listId: number }){
  const { lists, setLists } = useContext(ListContext);

  const [state, setState] = useState({ isEdit: false, text: props.name });

  const setEdit = (val: boolean) => setState({ ...state, isEdit: val, text: props.name });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setEdit(true);
    if (inputRef.current){
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  const handleDelete = () => {
    deleteTask(props.id, () => {
      setLists(lists.map(list => {
        if (list.id === props.listId){
          list.tasks = list.tasks.filter(task => task.id !== props.id);
        }
        return list;
      }));
    });
  }; 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTask(props.id, { name: state.text }, (res) => {
      setLists(lists.map(list => {
        if (list.id === props.listId){
          const task = list.tasks.find(task => task.id === props.id);
          if (task){
            task.name = state.text;
          }
        }
        return list;
      }));
      setState({ ...state, isEdit: false, text: res.name });
    });
  };

  return (
    <TaskWrapper 
      isEdit={state.isEdit}
    >
      <form onSubmit={handleSubmit}>
        <p>{props.name}</p> 
        <input 
          value={state.text}
          ref={inputRef}
          onChange={e => setState({ ...state, text: e.target.value })}
          onBlur={() => setEdit(false)}
          onKeyDown={e => e.key === 'Escape' && setEdit(false)}
          />
          <div className='task-icons'>
            <EditIcon className={'edit-icon'} onClick={handleClick}/>
            <DeleteIcon className={'delete-icon'} onClick={handleDelete}/>
          </div>
      </form>
    </TaskWrapper>
  );

}
