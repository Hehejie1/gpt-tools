import React, { useState, useEffect } from 'react'

export type JsonpType = {
  src?: string
  children: (data?: any) => React.ReactElement<any, any> | null
}

export const Jsonp: React.FC<JsonpType> = (props) => {
  const { src, children } = props
  const [data, setData] = useState<any>(null)

  const handleData = (result: any) => {
    setData(result)
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `${src}?callback=${handleData}`
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [src])

  return children(data)
}
