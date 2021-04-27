import styled, { css } from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useRef, useState } from 'react';
import FocusInput from './FocusInput';
import { Task as TaskResponse, useUpdateTaskMutation } from '../graphql/generated';

const hoverStyles = css`
    background-color: #f8ddaa;
    border: 2px solid #a5a5a5;
`;

const TaskWrapper = styled.div<{ isEdit: boolean; }>`
  background-color: wheat;
  border: 2px solid wheat;
  padding: 12px;
  margin: 16px 0;
  border-radius: 8px;
  ${props => props.isEdit && hoverStyles}

  svg { visibility: hidden }

  :focus {
    outline: none;
  }

  :hover  {
    ${hoverStyles}
    svg { visibility: ${({ isEdit }) => isEdit ? 'hidden' : 'visible'}; }
  }

  .task-icons {
    display: flex;
  }

  svg {
    cursor: pointer;
    padding: 4px;
    border-radius: 8px;
    :hover{
      background-color: #fbc55f;
    }
  }

  form {
    display: flex;
    justify-content: space-between;

  }
`;

type TaskProps = TaskResponse & { handleDelete?: (taskId: number) => void; };

export default function Task(props: TaskProps) {

  const [isEdit, setIsEdit] = useState(false);
  const [taskName, setTaskName] = useState(props.name);
  const [input, setInput] = useState(props.name);
  const taskRef = useRef<HTMLDivElement>(null);

  const [updateTask] = useUpdateTaskMutation({
    onCompleted: (data) => {
      setInput(data.updateTask.name);
      setTaskName(data.updateTask.name);
      setIsEdit(false);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === props.name) {
      setIsEdit(false);
      return;
    };
    updateTask({ variables: { taskId: props.id, task: { name: input } } });
  };

  // Keyboard controls on hover
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('key', props.name, e.key);
    if (isEdit) {
      switch (e.key) {
        case 'Escape':
          setIsEdit(false);
          setInput(taskName);
          break;

      }
    } else {
      switch (e.key) {
        case 'e':
          console.log('ok');
          setIsEdit(true);
          break;
      }
    }
  };

  const handleMouseOver = () => {
    if (taskRef.current) {
      const input = taskRef.current.querySelector('input');
      if (!input) {
        taskRef.current.focus();
      }
    }
  };

  return (
    <TaskWrapper isEdit={isEdit} ref={taskRef} tabIndex={-1} onMouseOver={handleMouseOver} onKeyUp={handleKeyDown}>
      {!isEdit ? <p data-testid='p-task'>{taskName}</p> :
        <form data-testid='form-update-task' onSubmit={handleSubmit}>
          <FocusInput
            data-testid='input-task'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </form>
      }
      <div className='task-icons'>
        <EditIcon data-testid={'edit-icon'} className={'edit-icon'} onClick={() => setIsEdit(true)} />
        <DeleteIcon data-testid={'delete-icon'} className={'delete-icon'} onClick={() => { if (props.handleDelete) props.handleDelete(props.id); }} />
      </div>
    </TaskWrapper>
  );

}
