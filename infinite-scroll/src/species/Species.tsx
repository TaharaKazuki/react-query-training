import type { FC } from 'react'

type Props = {
  name: string
  language: string
  averageLifespan: string
}

export const Species: FC<Props> = ({ name, language, averageLifespan }) => {
  return (
    <li>
      {name}
      <ul>
        <li>language: {language}</li>
        <li>average lifespan: {averageLifespan}</li>
      </ul>
    </li>
  )
}
