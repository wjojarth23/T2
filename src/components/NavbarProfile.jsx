
import {  Label } from 'flowbite-react';
import { useAuth } from '../hooks/useAuth'

export function NavbarProfile() {
  const { user } = useAuth();

  if(!user) return;

  return(
    <Label>{user.email}</Label>
  )
}