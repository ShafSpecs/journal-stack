import { useContext } from 'react'

import { SidebarContext } from '~/components/layout/remix-pwa/Sidebar'

function useSidebar() {
  const context = useContext(SidebarContext)

  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}

export { useSidebar }
