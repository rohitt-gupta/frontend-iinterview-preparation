import "./App.css";
import { useState, useEffect } from "react";

function App() {
	const [products, setProducts] = useState();
	const [page, setPage] = useState(3);

	const fetchProducts = async () => {
		const data = await fetch("https://dummyjson.com/products?limit=100");
		const result = await data.json();
		if (result && result.products) {
			setProducts(result.products);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div>
			{products && products.length > 0 && (
				<div className='products'>
					{products.slice(page * 10 - 10, page * 10).map((product) => {
						return (
							<span key={product.id} className='products__single'>
								<img src={product.thumbnail} alt={product.title} />
								{product.title}
							</span>
						);
					})}
				</div>
			)}
			{products.length > 0 && <div className='pagination'>span</div>}
		</div>
	);
}

evt_1Q06b4IW8iqWvH1wCosh0maZ;

export default App;
