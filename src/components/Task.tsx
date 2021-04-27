import styled, { css } from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import FocusInput from './FocusInput';
import { DeleteTaskMutationVariables, Task as TaskResponse, useUpdateTaskMutation } from '../graphql/generated';

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

  const handleCancel = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsEdit(false);
      setInput(taskName);
    }
  };

  return (
    <TaskWrapper isEdit={isEdit}>
      <form data-testid='form-update-task' onSubmit={handleSubmit} >
        {!isEdit ? <p data-testid='p-task'>{taskName}</p> :
          <FocusInput
            data-testid='input-task'
            value={input}
            onChange={e => setInput(e.target.value)}
            onBlur={() => setIsEdit(false)}
            onKeyDown={handleCancel}
          />}
      </form>
      <div className='task-icons'>
        <EditIcon data-testid={'edit-icon'} className={'edit-icon'} onClick={() => setIsEdit(true)} />
        <DeleteIcon data-testid={'delete-icon'} className={'delete-icon'} onClick={() => { if (props.handleDelete) props.handleDelete(props.id); }} />
      </div>
    </TaskWrapper>
  );

}
