import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RoutesType } from '../types'

let ComponentKeys: string[] = []
let ComponentMemo: Record<string, any> = {}

export const traverseRoutes = (
  routes?: RoutesType,
  clearCache = false
): RoutesType => {
  if (clearCache === true) {
    ComponentMemo = {}
    ComponentKeys = []
  }

  return routes?.map((route) => {
    const { redirect } = route
    let { element, component } = route

    if (typeof component === 'string') {
      // remove ./ or ../
      const name = component.replace(/^\.\.?\//, '')

      if (clearCache === true || !ComponentKeys.length) {
        ComponentMemo = import.meta.glob('/src/pages/**/*.tsx')
        ComponentKeys = Object.keys(ComponentMemo)
      }

      const componentPath = ComponentKeys.find((value) => {
        return [
          `/src/pages/${name}.tsx`,
          `/src/pages/${name}.jsx`,
          `/src/pages/${name}/index.tsx`,
          `/src/pages/${name}/index.jsx`,
        ].includes(value)
      })

      if (componentPath && Reflect.has(ComponentMemo, componentPath))
        component = lazy(ComponentMemo[componentPath])
    }

    if (redirect !== undefined)
      element = <Navigate replace to={redirect}></Navigate>

    return {
      ...route,
      component,
      element,
      children: traverseRoutes(route.children),
    }
  }) as RoutesType
}

export const traverseRoutesReplaceIcon = (routes?: RoutesType): RoutesType => {
  return routes?.map((route) => {
    let { icon } = route

    if (typeof icon === 'string') {
      const iconName =
        (icon as string).slice(0, 1).toUpperCase() + (icon as string).slice(1)
      const IconComponent = lazy(
        () => import(`@ant-design/icons/es/icons/${iconName}Outlined`)
      )
      icon = <IconComponent />
    }

    return {
      ...route,
      icon,
      children: traverseRoutes(route.children),
    }
  }) as RoutesType
}
