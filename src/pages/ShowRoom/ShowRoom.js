import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../component/ProductCard/ProductCard';

import './showroom.scss';

function ShowRoom() {
	const { products } = useSelector((state) => state.productStore);
	const { category } = useParams();
	const [productSort, setProductSort] = useState([]);

	// here i get both input(radio button) and after change category in useEffect i clear checked activity
	let activeSort = useRef();
	let activeSortTwo = useRef();
	let inputValue = useRef();

	useEffect(() => {
		setProductSort(products[category]);
		// disable radio button to false
		activeSort.current.checked = false;
		activeSortTwo.current.checked = false;
	}, [category]);

	// here from Event i make logic for price sort! or last 'else' random from product
	function filterByPrice(event) {
		if (event.target.value === 'low') {
			let copySort = productSort.slice();
			let sort = copySort.sort(function (a, b) {
				return a.price - b.price;
			});
			setProductSort(sort);
		} else if (event.target.value === 'bigger') {
			let copySort = productSort.slice();
			let sort = copySort.sort(function (a, b) {
				return b.price - a.price;
			});
			setProductSort(sort);
		} else {
			setProductSort(products[category]);
		}
	}
	// here i will make function for filter one specific product
	function findProduct() {
		// make copyArray then work with same
		let copySort = productSort.slice();
		// first i check if product is already in this [array] then go and set in state
		let filterProduct = copySort.filter((el) => {
			return el.title
				.toLowerCase()
				.includes(inputValue.current.value.toLowerCase());
		});
		// check if product is already then set and clear input
		if (inputValue.current.value.length > 0) {
			setProductSort(filterProduct);
			inputValue.current.value = '';
		} else {
			// or if empty then refresh allProducts
			setProductSort(products[category]);
		}
	}

	return (
		<section className='showroom container'>
			<aside>
				<h2 className='filter'>Find some shoes</h2>
				<div className='inputContainer'>
					<input
						ref={inputValue}
						className='inputShoes'
						type='text'
						placeholder='Search...'
					/>
					<button onClick={findProduct}>Find</button>
				</div>
				<h2 className='filter'>Filter Price</h2>
				<div className='filter-category'>
					<p>From lower to bigger</p>
					<input
						ref={activeSort}
						onClick={(event) => filterByPrice(event)}
						type='radio'
						name='sort'
						value='low'
						id=''
					/>
					<p>From bigger to lower</p>
					<input
						ref={activeSortTwo}
						onClick={(event) => filterByPrice(event)}
						type='radio'
						name='sort'
						value='bigger'
						id=''
					/>
				</div>
			</aside>
			<article>
				{productSort.map((el, index) => {
					return <ProductCard key={index} product={el} />;
				})}
			</article>
		</section>
	);
}

export default ShowRoom;
