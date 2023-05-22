import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'

import classes from './index.module.less'

const Error: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = React.useCallback(() => {
    navigate(-1)
  }, [])

  return (
    <div className={classes.container}>
      <Result
        className={classes.result}
        status="404"
        subTitle="抱歉，页面不见了～"
        extra={
          <Button key="back" type="primary" onClick={handleBack}>
            返回
          </Button>
        }
      />
    </div>
  )
}

export default Error
