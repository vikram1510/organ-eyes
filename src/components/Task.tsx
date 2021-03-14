import styled, { css } from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import FocusInput from './FocusInput';
import { Task as TaskProps, useUpdateTaskMutation } from '../graphql/generated';

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

export default function Task(props: TaskProps){

  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(props.name);
  const [updateTask, { data, error }] =  useUpdateTaskMutation();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text === props.name) {
      setIsEdit(false);
      return;
    };
    updateTask({ variables: {  taskId: props.id, task: { name: text } } });
  };
  
  useEffect(() => {
    if (data){
      setText(data.updateTask.name);
      setIsEdit(false);
    }
    if (error){
      console.log(error);
    }
  },[data, error]);

  return (
    <TaskWrapper isEdit={isEdit}>
        <form onSubmit={handleSubmit}>
          {!isEdit ? <p>{text}</p> : 
          <FocusInput
            value={text}
            onChange={e => setText(e.target.value)}
            onBlur={() => setIsEdit(false)}
          />}
        </form>
        <div className='task-icons'>
            <EditIcon className={'edit-icon'} onClick={() => setIsEdit(true)}/>
            <DeleteIcon className={'delete-icon'}/>
        </div>
    </TaskWrapper>
  );

}
