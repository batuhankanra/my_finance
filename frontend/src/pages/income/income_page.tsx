
import React from 'react'
import { useAppSelector } from '../../store/hook'
import { selectIncomes } from '../../store/selector/transactionSelectors'

const IncomePage:React.FC = () => {
    const incomes=useAppSelector(selectIncomes)
  return (
    <div>IncomePage</div>
  )
}

export default IncomePage