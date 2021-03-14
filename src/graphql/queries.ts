import { gql } from '@apollo/client';

export const GET_LISTS = gql`
  query lists {
    getLists{ 
      id
      name
      tasks {
        id
        name
      }
    }
}
`;

export const UPDATE_TASK = gql`
  mutation updateTask($taskId: Int!, $task: TaskUpdate!){
    updateTask(id:$taskId, taskUpdate: $task){
      name
      listId
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTask($task: TaskCreate!){
    createTask(taskCreate: $task){
      id
      name
    }
  }
`;
