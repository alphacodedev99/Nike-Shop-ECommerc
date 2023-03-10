import { createSlice } from '@reduxjs/toolkit';

const sliceUser = createSlice({
	name: 'user',
	initialState: {
		user: {},
		isLogged: false,
		favorite: [],
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
			localStorage.setItem(
				'logedUser',
				JSON.stringify(action.payload)
			);
			state.isLogged = true;
		},
		currentUser: (state, action) => {
			state.user = action.payload;
			state.isLogged = true;
		},

		logout: (state, action) => {
			state.user = {};
			localStorage.removeItem('logedUser');
			state.isLogged = false;
		},
		likeToggle: (state, action) => {
			let copyUser = { ...state.user };

			if (copyUser.hasOwnProperty('favorites')) {
				let index = copyUser.favorites.indexOf(action.payload);

				if (index === -1) {
					copyUser.favorites.push(action.payload);
				} else {
					copyUser.favorites.splice(index, 1);
				}
			} else {
				copyUser.favorites = [];
				copyUser.favorites.push(action.payload);
			}

			state.user = copyUser;
		},

		favoriteArray: (state, action) => {
			let copyArray = state.favorite;

			let foundIndex = null;
			copyArray.find((el, index) => {
				if (el.id === action.payload.id) {
					foundIndex = index;
					return;
				}
			});
			if (foundIndex === null) {
				copyArray.push(action.payload);
			} else {
				copyArray.splice(foundIndex, 1);
			}

			state.favorite = copyArray;

			console.log(state.favorite);
		},
	},
});

export const {
	login,
	logout,
	likeToggle,
	currentUser,
	favoriteArray,
} = sliceUser.actions;
export default sliceUser.reducer;
