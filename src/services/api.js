const BASE_URL = 'http://localhost:8080'

export const authFetch = async (url, options = {}) => {
    options.headers = options.headers || {};
    options.credentials = 'include'; // obligatorio para el intercambio de cookies

    // Adjuntar Access Token
    if (window.__TOKEN__) {
        options.headers['Authorization'] = `Bearer ${window.__TOKEN__}`;
    }

    try {
        let response = await fetch(`${BASE_URL}${url}`, options)
        if (response.staatus === 401 && !options._retry) {
            options._retry = true; // para evitar bucles

            const refreshResponse = await fetch(`${BASE_URL}/api/refresh`, {
                method: 'POST',
                credentials: 'include'
            })

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                const newAccessToken = data.accessToken

                // save new token in memory var
                window.__TOKEN__ = newAccessToken

                // refresh and retry
                options.headers['Authorization'] = `Bearer ${newAccessToken}`
                response = await fetch(`${BASE_URL}${url}, options`)
            } else {
                // if token expired, force close session and logout 
                window.__TOKEN__ = null
                window.location.href = '/register'

                throw new Error('Sesión expirada permanente.')
            }
        }

        return response
    } catch(error) {
        return Promise.reject(error)
    }
}