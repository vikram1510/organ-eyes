import React from 'react';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Task from '../Task';
import { UpdateTaskDocument } from '../../graphql/generated';
import { act } from 'react-dom/test-utils';


test('renders Task', () => {

  const wrapper = render(
    <MockedProvider mocks={[]}>
      <Task id={1} name={'pen'} handleDelete={() => console.log('delete')} />
    </MockedProvider>
  );

  const taskName = wrapper.queryByTestId('p-task');

  expect(wrapper.queryByTestId('input-task')).toBeNull();
  expect(taskName).toBeInTheDocument();
  expect(taskName).toHaveTextContent('pen');
});

test('can update a Task', async () => {

  const updateTaskMock = {
    request: {
      query: UpdateTaskDocument,
      variables: { taskId: 1, task: { name: 'lol' } }
    },
    result: {
      data: { updateTask: { name: 'lol' } }
    }
  };

  const wrapper = render(
    <MockedProvider mocks={[updateTaskMock]} addTypename={false}>
      <Task id={1} name={'pen'} handleDelete={() => console.log('delete')} />
    </MockedProvider>
  );

  // Click Edit
  fireEvent.click(wrapper.getByTestId('edit-icon'));

  // Task Name Label should disappear
  expect(wrapper.queryByTestId('p-task')).toBeNull();

  const getInput = () => wrapper.queryByTestId('input-task');
  expect(getInput()).toBeInTheDocument();

  // Change input value and submit
  fireEvent.change(getInput()!, { target: { value: 'lol' } });
  fireEvent.submit(wrapper.getByTestId('form-update-task'));

  // wait for state to be updated
  await act(() => new Promise(resolve => setTimeout(resolve, 0)));

  expect(getInput()).toBeNull();
  expect(wrapper.getByTestId('p-task')).toHaveTextContent('lol');

});
