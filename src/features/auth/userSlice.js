import { createSlice } from '@reduxjs/toolkit';

const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        // handle localStorage error if needed
    }
};

const removeFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        // handle localStorage error if needed
    }
};

const getInitialState = () => {
    let userData = null;
    let profileData = null;
    try {
        const userDataStr = localStorage.getItem('userData');
        const profileDataStr = localStorage.getItem('profileData');
        if (userDataStr) userData = JSON.parse(userDataStr);
        if (profileDataStr) profileData = JSON.parse(profileDataStr);
    } catch (e) {
        // handle parse error if needed
    }
    return {
        userData,
        profileData,
        loading: false,
        error: null,
    };
};

export const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            saveToLocalStorage('userData', action.payload);
        },
        setProfileData: (state, action) => {
            state.profileData = action.payload;
            saveToLocalStorage('profileData', action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearUserData: (state) => {
            state.userData = null;
            state.profileData = null;
            removeFromLocalStorage('userData');
            removeFromLocalStorage('profileData');
        },
    },
});

export const { setUserData, setProfileData, setLoading, setError, clearUserData } = userSlice.actions;

export default userSlice.reducer;