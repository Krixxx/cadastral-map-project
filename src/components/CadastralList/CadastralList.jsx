import React from 'react'

import { SingleItem } from '..'

//import modern Redux hooks
import { useSelector } from 'react-redux'

const CadastralList = () => {
  const cadastralList = useSelector((state) => state.cadastralList) || []

  if (cadastralList.length === 0) {
    return (
      <section>
        <h1>Cadastral List</h1>
        <p>List is empty</p>
      </section>
    )
  }

  return (
    <section>
      <h1>Cadastral List</h1>
      {cadastralList.map((element, i) => {
        return <SingleItem key={i} item={element} />
      })}
    </section>
  )
}

export default CadastralList
