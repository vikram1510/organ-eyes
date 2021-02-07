import styled, { css } from 'styled-components';
import { TaskResponse, updateTask } from '../api';
import EditIcon from '@material-ui/icons/Edit';
import { useContext, useRef, useState } from 'react';
import { ListContext } from '../App';

const hoverStyles = css`
    background-color: #f8ddaa;
    border: 2px solid #a5a5a5;
    svg { visibility: visible;  } 
`;

const TaskWrapper = styled.div<{ isEdit: boolean }>`
  background-color: wheat;
  border: 2px solid wheat;
  padding: 12px;
  margin: 16px 0;
  border-radius: 8px;
  cursor: pointer;

  svg { visibility: ${({ isEdit }) => isEdit ? 'visible' : 'hidden'  }; }

  ${props => props.isEdit && hoverStyles}

  :hover  {
    ${hoverStyles}
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setState({ ...state, isEdit: true });
    if (inputRef.current){
      setTimeout(() => inputRef.current?.focus(), 10);
    }
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
      onClick={handleClick}
      isEdit={state.isEdit}
    >
      <form onSubmit={handleSubmit}>
        <p>{props.name}</p> 
        <input 
          value={state.text}
          ref={inputRef}
          onChange={e => setState({ ...state, text: e.target.value })}
          onBlur={() => setState({ ...state, isEdit: false })}/>
        <EditIcon />
      </form>
    </TaskWrapper>
  );

}
