import pb from '../pocketbase';
import {useState} from 'react'
import {atom, useAtom} from 'jotai'

const isAdminAtom = atom(pb?.authStore?.isAdmin)
const userAtom = atom(pb?.authStore?.model)

async function adminLoginFn({email, password}) {
  return await pb.admins.authWithPassword(email, password);
}

async function loginFn({email, username, password}) {
  if (!username && !email) return;
  const usernameOrEmail = username ? username : email;
  return await pb.collection('users')
    .authWithPassword(usernameOrEmail, password);
}

async function registerFn(data) {
  return await pb.collection('users')
    .create({...data, emailVisibility: true})
    .then(async()=>await loginFn(data));
}

async function logoutFn() {
  return await pb.authStore.clear();
}

async function changePasswordFn({id, set}) {
  return await pb.collection('users').update(id, set)
}


export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);
  
  const [error, setError] = useState();
  //provide basic error handling
  function handleError(e) {
      console.log(e); 
      resetUser();
      setError(e)
      return null;   
  }
  async function adminLogin(data) {
    setError(null);
    try {
      const response = await adminLoginFn(data);
      if (response && pb.authStore?.model) {
        setUser(pb.authStore.model)
        setIsAdmin(pb.authStore.isAdmin)
      }
      return pb.authStore.model
    } 
    catch(e) {
      return handleError(e);
    }
  }
  async function login(data) {
    setError(null);
    try {
      const response = await loginFn(data);
      if (response && pb.authStore?.model) setUser(pb.authStore.model)
      return pb.authStore.model
    } 
    catch(e) {
      return handleError(e);
    }
  }
  async function signup(data) {
    setError(null);
    try {
      const response = await registerFn(data);
      if (response && pb.authStore?.model) setUser(pb.authStore.model)
      return pb.authStore.model
    } 
    catch(e) {
      return handleError(e);
    }
  }
  async function logout() {
    await pb.authStore.clear();
    resetUser();
  }
  function resetUser() {
    setUser(null);
    setIsAdmin(null);
  }
  const clear = () => setError(null);
  return {user, isAdmin, adminLogin, login, logout, signup, error, clear};
}
