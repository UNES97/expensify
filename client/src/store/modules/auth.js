import axios from 'axios';
import { BASE_URL } from '../../consts';
import { showNotification, parseJwt } from '../../utils';

export default {
    state() {
        return {
            isLogged: false,
        }
    },
    getters: {
        getLogged: (state) => state.isLogged,
    },
    mutations: {
        LOGIN_SUCCESS(state, payload) {
            state.isLogged = true;
            localStorage.setItem('userAuthenticated', JSON.stringify(payload.accessToken));
            let authUser = parseJwt(JSON.parse(localStorage.getItem("userAuthenticated")));
            console.log(authUser);
            window.location.assign(`/dashboard`);
        },
        LOGOUT(state) {
            state.isLogged = false;
            localStorage.removeItem('userAuthenticated');
            window.location.assign(`/`);
        },
        LOGIN_FAILURE(state, payload) {
            state.isLogged = false;
            localStorage.removeItem('userAuthenticated');
            showNotification(payload);
        },
        CHECK_LOGIN_STATUS(state) {
            if (!localStorage.getItem("userAuthenticated")) {
                state.isLogged = false;
            }
            else {
                let authUser = parseJwt(JSON.parse(localStorage.getItem("userAuthenticated")));
                var expires = authUser.exp;
                if (typeof expires === 'number') {
                    if (expires * 1000 < Date.now()) {
                        state.isLogged = false;
                    }
                    else {
                        state.isLogged = true;
                    }
                }
                else {
                    state.isLogged = false;
                }
            }
        },
    },
    actions: {
        async signIn({ commit }, credentials) {
            try {
                const response = await axios.post(`${BASE_URL}api/signin`, credentials);
                if (response.data.statusCode === 200) {
                    commit('LOGIN_SUCCESS', response.data);
                } else {
                    const errorMessage = response.data.message || 'Failed to sign in. Please try again.';
                    commit('LOGIN_FAILURE', errorMessage);
                }
            } catch (error) {
                commit('LOGIN_FAILURE', error.message || 'Failed to sign in. Please try again.');
            }
        },
    }
}