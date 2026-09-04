import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

/** Falso si faltan las variables de entorno (por ejemplo en un preview). */
export const hayConfigSupabase = Boolean(url && key)

const AVISO =
  'Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. ' +
  'La web se muestra sin catálogo; defínelas en el entorno para cargar los productos.'

/**
 * Cliente inerte: responde a cualquier cadena de llamadas con una lista
 * vacía. Sin esto, createClient lanza al importar el módulo y la web
 * entera queda en blanco por una variable de entorno que falta.
 */
function clienteVacio() {
  const respuesta = Promise.resolve({ data: null, error: { message: AVISO } });

  const encadenable = new Proxy(function () {}, {
    get(_t, prop) {
      if (prop === 'then') return respuesta.then.bind(respuesta)
      if (prop === 'catch') return respuesta.catch.bind(respuesta)
      if (prop === 'finally') return respuesta.finally.bind(respuesta)
      return () => encadenable
    },
    apply: () => encadenable,
  })

  const sinSesion = Promise.resolve({ data: { session: null }, error: null })

  return {
    from: () => encadenable,
    storage: { from: () => encadenable },
    auth: {
      getSession: () => sinSesion,
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe() {} } },
      }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: AVISO } }),
      signOut: () => Promise.resolve({ error: null }),
    },
  }
}

if (!hayConfigSupabase) console.warn(AVISO)

export const supabase = hayConfigSupabase ? createClient(url, key) : clienteVacio()
