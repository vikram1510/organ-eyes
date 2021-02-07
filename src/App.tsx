import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import './App.css';
import { getLists, ListResponse } from './api';
import styled from 'styled-components';
import List from './components/List';

const Page = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100vh;
  width: 100vw;
  background-color: #202020;
  padding: 24px;
`;

export const ListContext = createContext<{ lists: ListResponse[], setLists:Dispatch<SetStateAction<ListResponse[]>> }>({ lists: [], setLists: () => console.log('uninitialised context') });


function App() {

  const [lists, setLists] = useState<ListResponse[]>([]);

  useEffect(() => {
    getLists(setLists); 
  },[]);

  if (!lists) return null;

  return (
    <ListContext.Provider value={{ lists, setLists }}>
      <Page>
        {lists.map(list => (
          <List key={list.id} {...list}/>
          ))}
      </Page>
    </ListContext.Provider>
  );
}

export default App;
