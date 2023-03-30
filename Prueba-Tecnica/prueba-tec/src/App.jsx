import { useEffect, useState } from 'react'
const FACT_URL = 'https://catfact.ninja/fact'
// const CAT_IMAGE = `https://cataas.com/cat/says/${firstWord}`

export function App () {
  const [fact, setFact] = useState('Lorem ipsum Cat')
  const [imageCat, setImageCat] = useState('')
  const [factError, setFactError] = useState('')

  useEffect(() => {
    fetch(FACT_URL)
      .then(res => {
        if (!res.ok) throw new Error('Error fetching fact')
        return res.json()
      })
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
      .catch((error) => {
        setFactError(error.message)
      })
  }, [])

  useEffect(() => {
    if (!fact) return
    const firstWord = fact.split(' ')[0]
    fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setImageCat(url)
      })
  }, [fact])

  return (
    <main>
      <h1>App Gatos</h1>
      {fact && <p>{fact}</p>}
      {imageCat && <img width='auto' height='200px' src={`https://cataas.com/${imageCat}`} alt={`cat whit this fact:${fact}`} />}
    </main>
  )
}
