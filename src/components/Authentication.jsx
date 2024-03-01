import { Button} from 'flowbite-react';
import {LoginModal} from './LoginModal'
import {SignupModal} from './SignupModal'
import {NavbarProfile} from './NavbarProfile'
import { useAuth } from '../hooks/useAuth'

export function Authentication(props) {
  const { user, logout } = useAuth();
  function changeState(){
    if (localStorage.theme ==='light' || (!('theme' in localStorage))) {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark')

    } else{localStorage.theme = 'light'
  document.documentElement.classList.remove('dark')
}
}
  if (user) {
    return (
      <div {...props}>
      <NavbarProfile/>
      <Button size='sm' className="dark:hidden bg-blue-700 hover:enabled:bg-blue-800 dark:b-gray-600 dark:bg-gray-800 dark:text-gray-600"onClick={changeState}>Dark Mode</Button>
      <Button size='sm' className="hidden dark:block bg-blue-700 dark:b-gray-800 dark:bg-gray-800 dark:enabled:hover:bg-gray-700 dark:text-gray-500 dark:border-gray-500"onClick={changeState}>Light Mode</Button>
      <Button size='sm' color='gray' onClick={logout}>Logout</Button>
    </div>
    )  
  }
  return (
    <div {...props}>
      <SignupModal/>
      <LoginModal/>
    </div>
  )
}