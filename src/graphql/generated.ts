import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type ListUpdate = {
  name?: Maybe<Scalars['String']>;
  tasks?: Maybe<Array<Scalars['Int']>>;
};

export type ListCreate = {
  name: Scalars['String'];
  tasks: Array<Scalars['Int']>;
};

export type List = {
  __typename?: 'List';
  id: Scalars['Int'];
  name: Scalars['String'];
  tasks: Array<Task>;
};

export type TaskUpdate = {
  name?: Maybe<Scalars['String']>;
  listId?: Maybe<Scalars['Int']>;
};

export type TaskCreate = {
  name: Scalars['String'];
  listId?: Maybe<Scalars['Int']>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Int'];
  name: Scalars['String'];
  listId?: Maybe<Scalars['Int']>;
  list?: Maybe<List>;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getList: List;
  getLists: Array<List>;
  getTask: Task;
  getTasks: Array<Task>;
};


export type QueryGetListArgs = {
  id: Scalars['Int'];
};


export type QueryGetTaskArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createList: List;
  updateList: List;
  deleteList: Message;
  createTask: Task;
  updateTask: Task;
  deleteTask: Message;
};


export type MutationCreateListArgs = {
  listCreate: ListCreate;
};


export type MutationUpdateListArgs = {
  id: Scalars['Int'];
  listUpdate: ListUpdate;
};


export type MutationDeleteListArgs = {
  id: Scalars['Int'];
};


export type MutationCreateTaskArgs = {
  taskCreate: TaskCreate;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['Int'];
  taskUpdate: TaskUpdate;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Int'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type ListsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListsQuery = (
  { __typename?: 'Query' }
  & { getLists: Array<(
    { __typename?: 'List' }
    & Pick<List, 'id' | 'name'>
    & { tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'name'>
    )> }
  )> }
);

export type UpdateTaskMutationVariables = Exact<{
  taskId: Scalars['Int'];
  task: TaskUpdate;
}>;


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'name' | 'listId'>
  ) }
);

export type CreateTaskMutationVariables = Exact<{
  task: TaskCreate;
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name'>
  ) }
);


export const ListsDocument = gql`
    query lists {
  getLists {
    id
    name
    tasks {
      id
      name
    }
  }
}
    `;

/**
 * __useListsQuery__
 *
 * To run a query within a React component, call `useListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListsQuery(baseOptions?: Apollo.QueryHookOptions<ListsQuery, ListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListsQuery, ListsQueryVariables>(ListsDocument, options);
      }
export function useListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListsQuery, ListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListsQuery, ListsQueryVariables>(ListsDocument, options);
        }
export type ListsQueryHookResult = ReturnType<typeof useListsQuery>;
export type ListsLazyQueryHookResult = ReturnType<typeof useListsLazyQuery>;
export type ListsQueryResult = Apollo.QueryResult<ListsQuery, ListsQueryVariables>;
export const UpdateTaskDocument = gql`
    mutation updateTask($taskId: Int!, $task: TaskUpdate!) {
  updateTask(id: $taskId, taskUpdate: $task) {
    name
    listId
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      task: // value for 'task'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const CreateTaskDocument = gql`
    mutation createTask($task: TaskCreate!) {
  createTask(taskCreate: $task) {
    id
    name
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      task: // value for 'task'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;