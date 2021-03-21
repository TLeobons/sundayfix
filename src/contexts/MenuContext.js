import { createContext, useState } from 'react'

export const MenuContext = createContext()

const MenuProvider = ({children}) => {
  
  const [menuOpenState, setMenuOpenState] = useState(false)

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: newState => setMenuOpenState(newState.isOpen),
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export default MenuProvider
