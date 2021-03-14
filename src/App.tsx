import React from 'react';
import './App.css';
import styled from 'styled-components';
import List from './components/List';
import { useListsQuery } from './graphql/generated';

const Page = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100vh;
  width: 100vw;
  background-color: #202020;
  padding: 24px;
`;

function App() {

  const { loading, error, data } = useListsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Page>
      {data?.getLists.map(list => (
        <List key={list.id} {...list}/>
        ))}
    </Page>
  );
}

export default App;
