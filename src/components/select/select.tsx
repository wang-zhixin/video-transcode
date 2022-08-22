import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import ChevronUpDown from '@geist-ui/icons/chevronUpDown';
import Check from '@geist-ui/icons/check';

import { easeInOut } from '../animation';
import styles from './select.module.css';

export type SelectProps<T> = React.PropsWithChildren<{
  name?: string;
  value: T;
  onChange: (value: T) => void;
  label?: string;
  className?: string;
  'aria-label'?: string;
}>;

export function Select<T extends string | number = string>(
  props: SelectProps<T>
) {
  const childArray = React.Children.toArray(
    props.children
  ) as React.ReactElement[];
  const selectedOptionChildren = childArray.find(
    (ele) => ele.props.value === props.value
  )?.props.children;
  return (
    <Listbox name={props.name} value={props.value} onChange={props.onChange}>
      {({ open }) => (
        <div className='relative flex items-center'>
          {props.label && (
            <Listbox.Label className='mr-3 w-32 text-gray-700'>
              {props.label}
            </Listbox.Label>
          )}
          <div className={clsx('relative', props.className)}>
            <Listbox.Button className='relative w-full cursor-default border-2 border-white border-solid bg-gradient-to-t from-white to-[#f3f8f5] shadow-card transition-all duration-300 rounded-sm py-2 pl-3 pr-10 text-left outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-10 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm'>
              <span>{selectedOptionChildren || props.name}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400'>
                <ChevronUpDown size={18} />
              </span>
            </Listbox.Button>
            <AnimatePresence>
              {open && (
                <motion.div
                  {...easeInOut}
                  className={clsx(
                    'absolute z-20 mt-1  py-1 w-full shadow-lg  bg-gray-50 ',
                    styles.options
                  )}
                >
                  <Listbox.Options
                    className={clsx(
                      'focus-visible:outline-none max-h-60 overflow-auto overscroll-contain50 px-2'
                    )}
                    static
                  >
                    {props.children}
                  </Listbox.Options>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </Listbox>
  );
}

Select.Option = SelectOption;

type SelectOptionProps<T> = {
  children: React.ReactNode;
  value: T;
  className?: string;
};

function SelectOption<T>(props: SelectOptionProps<T>): JSX.Element {
  return (
    <Listbox.Option
      key={String(props.value)}
      value={props.value}
      as={React.Fragment}
    >
      {({ selected, active }) => (
        <li
          className={clsx(
            active ? 'text-white bg-primary' : '',
            selected && 'text-white bg-primary',
            'my-1 relative cursor-default select-none py-2 pl-8 pr-4 rounded hover:text-white'
          )}
        >
          {selected && (
            <span className='absolute inset-y-0 left-0 flex items-center pl-1.5'>
              <Check size={18} />
            </span>
          )}
          {props.children}
        </li>
      )}
    </Listbox.Option>
  );
}
