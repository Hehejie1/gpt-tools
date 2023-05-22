import React, { useMemo, useRef, useState } from 'react'
import { Select, Spin } from 'antd'
import { debounce } from 'lodash-es'

import type { SelectProps } from 'antd/es/select'

export type TodoSelectProps<ValueType = any> = Omit<
  SelectProps<ValueType | ValueType[]>,
  'options' | 'children'
> & {
  fetchOptions: (text?: string) => Promise<ValueType[]>
  debounceTimeout?: number
}

export type ValueType = {
  key?: string
  label: string | React.ReactNode
  value: string | number
}

export const TodoSelect: React.FC<TodoSelectProps<ValueType>> = (props) => {
  const { fetchOptions, debounceTimeout = 800, ...reset } = props
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<ValueType[]>([])
  const fetchRef = useRef(0)

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return
        }

        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  return (
    <Select
      showSearch
      showArrow={false}
      filterOption={false}
      labelInValue
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...reset}
      options={options}
    />
  )
}
