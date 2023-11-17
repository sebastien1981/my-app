// SearchComponent.js
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=10`,
        {
          headers: {
            Authorization: `Bearer TOKEN`,
          },
        }
      );

      setResults(response.data.artists.items);
      setHasMore(response.data.artists.total > 10);
      setOffset(10);
    } catch (error) {
      console.error('Error fetching data from Spotify API', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=10&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer BQBIuvGqPiZRVA0KMVnry5o6hzdgYvrBPuJ_80J175T00ExaGOjpfN_D3VPRrx-RAMDlBPywLsU3JfETJCz1NMiTjQqlI5gr_WD5Z6r7s1ujLwz9b7w`,
          },
        }
      );

      setResults([...results, ...response.data.artists.items]);
      setOffset(offset + 10);
      setHasMore(results.length + response.data.artists.items.length < response.data.artists.total);
    } catch (error) {
      console.error('Error fetching more data from Spotify API', error);
    }
  };

  useEffect(() => {
    if (query.trim() !== '') {
      handleSearch();
    }
  }, [query]);

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      <button onClick={handleSearch} disabled={loading}>
        Search
      </button>

      <InfiniteScroll
        dataLength={results.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {results.map((artist) => (
            <div key={artist.id}>
              <h3>{artist.name}</h3>
              {artist.images.length > 0 && (
                <img
                  src={artist.images[0].url}
                  alt={`${artist.name} thumbnail`}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default SearchComponent;
