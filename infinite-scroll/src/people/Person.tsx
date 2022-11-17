import type { FC } from 'react'

type Props = {
  name: string
  hairColor: string
  eyeColor: string
}

export const Person: FC<Props> = ({ name, hairColor, eyeColor }) => {
  return (
    <li>
      {name}
      <ul>
        <li>hair: {hairColor}</li>
        <li>eyes: {eyeColor}</li>
      </ul>
    </li>
  )
}
