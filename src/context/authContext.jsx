import { createContext, useState, useEffect } from 'react'

// Crear logica para los token de sesión
export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Silence try of login at loading usinf refresh roken
        const verifyInitialSesion = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/refresh', {
                    method: 'POST',
                    credentials: 'include'
                })

                if (response.ok) {
                    const data = await response.json()
                    window.__TOKEN__ = data.accessToken
                }
            } catch (error) {
                console.log('Sin sesión previa')
            } finally {
                setLoading(false)
            }
        }

        verifyInitialSesion()
    }, [])

    const login = (accessToken, userData) => {
        window.__TOKEN__ = accessToken
        setUser(userData);
    }

    const logout = async () => {
        window.__TOKEN__ = null
        setUser(null)
        await fetch('http://localhost:8080/api/auth/logout',{
            method: 'POST',
            credentials: 'include'
        })
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
