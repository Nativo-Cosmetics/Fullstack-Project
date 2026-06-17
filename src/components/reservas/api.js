const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

const buildUrl = (path, params = {}) => {
  const url = new URL(`${API_BASE}${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })
  return url.toString()
}

const handleResponse = async (response) => {
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(body.message || 'Error de comunicación con el servidor')
  }
  return body
}

export const fetchServicios = async () => {
  const response = await fetch(buildUrl('/api/servicios'))
  return handleResponse(response)
}

export const fetchDisponibilidad = async ({ servicioId, fecha }) => {
  const response = await fetch(buildUrl('/api/disponibilidad', { servicioId, fecha }))
  return handleResponse(response)
}

export const createReserva = async (payload) => {
  const response = await fetch(`${API_BASE}/api/reservas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(response)
}

export const fetchReservas = async () => {
  const response = await fetch(`${API_BASE}/api/reservas`)
  return handleResponse(response)
}

export const updateReserva = async (id, payload) => {
  const response = await fetch(`${API_BASE}/api/reservas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(response)
}

export const deleteReserva = async (id) => {
  const response = await fetch(`${API_BASE}/api/reservas/${id}`, {
    method: 'DELETE',
  })
  return handleResponse(response)
}
