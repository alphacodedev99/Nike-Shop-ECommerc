import { createSlice } from '@reduxjs/toolkit';

const sliceUser = createSlice({
	name: 'user',
	initialState: {
		user: {},
		isLogged: false,
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
			localStorage.setItem(
				'logedUser',
				JSON.stringify(action.payload)
			);
			state.isLogged = true;
			console.log(state.user);
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
			console.log(copyUser);
		},
	},
});

export const { login, logout, likeToggle, currentUser } =
	sliceUser.actions;
export default sliceUser.reducer;
