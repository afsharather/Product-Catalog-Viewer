import React, { useState } from 'react';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Search Products</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            className="form-control" 
            placeholder="Search for products..." 
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <img src={product.thumbnail} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <a href={`/product/${product.id}`} className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
