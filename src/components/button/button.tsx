import clsx from 'clsx';
import * as React from 'react';

import { BaseButton, BaseButtonProps } from './base-button';
import styles from './button.module.css';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Color = 'primary' | 'red' | 'gray';
type Variant = 'solid' | 'default' | 'text' /*| 'ghost' */;

export type ButtonProps = BaseButtonProps & {
  variant?: Variant;
  children: React.ReactNode;
  color?: Color;
  disabled?: boolean;
  size?: Size;
  shadow?: boolean;
  /**
   * @default true
   */
  rounded?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

// TODO: extract drip animation to the base button
export const Button = React.forwardRef(function Button(
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
): JSX.Element {
  const {
    variant = 'default',
    color = 'gray',
    disabled = false,
    size = 'md',
    className,
    shadow = true,
    rounded = 'true',
    onClick,
    children,
    ...restProps
  } = props;
  const defaultRef = React.useRef<HTMLButtonElement>();
  const _ref: React.RefObject<HTMLButtonElement> = (ref ||
    defaultRef) as React.RefObject<HTMLButtonElement>;

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }
    onClick?.(event);
  };
  return (
    <BaseButton
      {...restProps}
      ref={_ref}
      className={clsx(
        sizeStyles[size],
        className,
        ColorVariantStyles[`${variant}-${color}` as VariantColor],
        variant !== 'text' && shadow && `shadow-sm`,
        rounded && `rounded-sm`
      )}
      onClick={clickHandler}
      disabled={disabled}
    >
      {children}
    </BaseButton>
  );
});

const sizeStyles: Record<Size, string> = {
  sm: `py-1 px-2.5 text-sm space-x-1`,
  md: `py-2 px-3 text-base`,
  lg: `py-3 px-4 text-lg`,
  xl: `py-4 px-5 text-xl`,
};

type VariantColor = `${Variant}-${Color}`;

type VariantColors = Record<VariantColor, string>;

const ColorVariantStyles: VariantColors = {
  'solid-primary': `bg-primary text-gray-100 hover:bg-primary-dark focus-visible:ring-primary-light`,
  'solid-red': `bg-red-900 text-whitea-1200 hover:bg-red-1000 focus-visible:ring-red-1000`,
  'solid-gray': `bg-gray-1000 text-whitea-1200 hover:bg-gray-1100 focus-visible:ring-gray-1100`,

  'default-primary': `border border-primary-light text-primary hover:border-primary-dark text-primary-1000`,
  'default-red': `border border-red-700 text-red-900 hover:border-red-900 text-red-1000`,
  'default-gray': `border text-gray-1100 hover:border-gray-900 text-gray-1200`,

  'text-primary': `text-primary hover:bg-gray-300`,
  'text-red': `text-red-900 hover:bg-gray-300`,
  'text-gray': `text-gray-1100 hover:bg-gray-300`,
};
