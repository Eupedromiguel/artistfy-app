import { useState } from 'react';
import { MESSAGES } from '../../utils/constants';

export default function SearchBar({ onSearch, placeholder = MESSAGES.SEARCH_PLACEHOLDER }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl">
      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-8 py-4 text-lg rounded-full bg-spotify-gray text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotify-green"
        />
        <button
          type="submit"
          className="btn-primary"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
