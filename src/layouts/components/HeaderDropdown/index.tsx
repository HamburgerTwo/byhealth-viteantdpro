import styles from './index.module.less'
import { Dropdown } from 'antd'
import React from 'react'
import classNames from 'classnames'
import type { DropDownProps } from 'antd/es/dropdown'

export interface HeaderDropdownProps  extends DropDownProps {
  overlayClassName?: string
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter'
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => (
  <Dropdown
    overlayClassName={classNames(styles.container, cls)}
    {...restProps}
  />
)

export default HeaderDropdown
