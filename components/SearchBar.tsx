import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}
            style={{
                alignSelf: 'center',
                marginBottom: '30px',

            }}
        >
            <input type="text" value={query} onChange={handleInputChange} placeholder='Search a launch !' 
                style={{padding: '4px', marginRight: '-4.5em', borderRadius: 30, paddingLeft: 10, paddingRight: 90, }}
            />
            <button type="submit"
                style={{padding: '5px', backgroundColor: 'transparent', borderWidth: 0,}}
            >Search</button>
        </form>
    );
};

export default SearchBar;