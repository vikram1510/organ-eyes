import React from 'react';
import { fireEvent, getByText, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Task from '../Task';
import { UpdateTaskDocument } from '../../graphql/generated';
import { act } from 'react-dom/test-utils';

const stateChange = () => act(() => new Promise(resolve => setTimeout(resolve, 0)));

test('render Task component', () => {

  const wrapper = render(
    <MockedProvider>
      <Task id={1} name={'pen'} handleDelete={() => console.log('delete')} />
    </MockedProvider>
  );

  const taskName = wrapper.queryByTestId('p-task');

  expect(wrapper.queryByTestId('input-task')).toBeNull();
  expect(taskName).toBeInTheDocument();
  expect(taskName).toHaveTextContent('pen');
});

test('update task', async () => {

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
    <MockedProvider mocks={[updateTaskMock]}>
      <Task id={1} name={'pen'} />
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
  await stateChange();

  expect(getInput()).toBeNull();
  expect(wrapper.getByTestId('p-task')).toHaveTextContent('lol');

});

test('delete task', () => {

  const handleDelete = jest.fn();
  const wrapper = render(
    <MockedProvider addTypename={false}>
      <Task id={1} name={'pen'} handleDelete={handleDelete} />
    </MockedProvider>
  );

  const deleteIcon = wrapper.getByTestId('delete-icon');
  fireEvent.click(deleteIcon);

  expect(handleDelete).toBeCalledWith(1);
});

test('cancel on ESC', async () => {
  const updateTaskMock = {
    request: {
      query: UpdateTaskDocument,
      variables: { taskId: 1, task: { name: 'pencil' } }
    },
    result: {
      data: { updateTask: { name: 'pencil' } }
    }
  };

  const wrapper = render(
    <MockedProvider mocks={[updateTaskMock]}>
      <Task id={1} name={'pen'} />
    </MockedProvider>
  );

  const editIcon = wrapper.getByTestId('edit-icon');
  fireEvent.click(editIcon);

  expect(wrapper.queryByTestId('p-task')).toBeNull();

  let input = wrapper.getByTestId('input-task');
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: 'pencil' } });
  fireEvent.submit(wrapper.getByTestId('form-update-task'));

  await stateChange();

  expect(wrapper.queryByTestId('p-task')).toHaveTextContent('pencil');

  fireEvent.click(editIcon);
  input = wrapper.getByTestId('input-task');

  fireEvent.change(wrapper.getByTestId('input-task'), { target: { value: 'whatever' } });
  fireEvent.keyDown(input, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27
  });

  await stateChange();

  expect(wrapper.queryByTestId('input-task')).toBeNull();
  expect(wrapper.queryByTestId('p-task')).toHaveTextContent('pencil');
});
