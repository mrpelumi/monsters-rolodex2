import { useState, useEffect } from 'react';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  console.log('render');
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => setMonsters(users)
    );
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
      })
    setFilterMonsters(newFilteredMonsters);
  
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
    
  }
  console.log(filteredMonsters);
  return (
  <div className="App">
    <h1 className='app-title'> Monsters Rolodex</h1>
    <SearchBox 
      onchangeHandler={onSearchChange} 
      placeholder={'search monsters'} 
      className='search-box' 
    />
    
    <CardList monsters={filteredMonsters} />
  </div> )
}

export default App;
