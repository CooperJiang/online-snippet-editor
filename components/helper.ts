export interface MenuItem {
  name: string
  key: any
  options?: any
}

export interface SelectMenuProps {
  icon?: string
  menuList: MenuItem[]
  width?: number
  offset?: any
  location?: string
}
