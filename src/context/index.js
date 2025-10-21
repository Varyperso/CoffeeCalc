import { useContext } from 'react'
import { UsersContext } from './UsersContext'
import { UserContext } from './UserContext'
import { UiContext } from './UIContext'
import { ItemsContext } from './ItemsContext'

export { UserProviderItems } from './ItemsContext'
export { UserProviderUi } from './UIContext'
export { UserProviderUser } from './UserContext'
export { UserProviderUsers } from './UsersContext'

export const useUserData = () => useContext(UserContext);
export const useUsersData = () => useContext(UsersContext)
export const useUiData = () => useContext(UiContext)
export const useItemsData = () => useContext(ItemsContext)