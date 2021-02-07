import { useContext } from 'react';
import styled from 'styled-components';
import { ListResponse } from '../api';
import { ListContext } from '../App';
import Task from './Task';

const ListWrapper = styled.div`
  /* display: flex; */
  padding: 16px;
  background-color: #c2c2c2;
  color: #3b3b3b;
  min-width: 320px;
  max-width: 320px;
  margin-right: 16px;
  border-radius: 4px;
`;


export default function List(props: ListResponse){

  const { setLists } = useContext(ListContext);

  return (
    <ListWrapper>
      <p>{props.name}</p>
      {props.tasks.map(task => (
        <Task key={task.id} {...task} listId={props.id}/>
      ))}
    </ListWrapper>
  );

}
