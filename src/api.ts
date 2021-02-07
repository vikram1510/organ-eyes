import axios from 'axios';

const url = 'http://localhost:4000';

export type TaskResponse = {
  id: number,
  name: string,
}

export type TaskCreate = TaskResponse & { list: number }
export type TaskUpdate = Omit<TaskResponse, 'id'>

export type ListResponse = {
  id: number,
  name: string,
  tasks: TaskResponse[]
}

export async function getLists(callback?: ((res: ListResponse[]) => void )): Promise<ListResponse[]> {
  const res = await axios.get<ListResponse[]>(url + '/lists');
  console.log(res.data);
  if (callback) callback(res.data);
  return res.data;
}

export async function updateTask(id: number | string, body: TaskUpdate, callback?: ((res: TaskResponse) => void)){
  const res = await axios.patch<TaskResponse>(url + `/tasks/${id}`, body);
  if (callback) callback(res.data);
  return res.data;
}
