import React from 'react'
import { BiCommentX } from 'react-icons/bi';
import { MdOutlineVideocamOff } from 'react-icons/md'

interface Props {
  text: string;
}

export default function NoResults({ text }: Props) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <p className="text-8xl">
        {text === 'No comments yet' ? (
          <BiCommentX />
        ) : (
          <MdOutlineVideocamOff />
        )}
        
      </p>
      <p className="text-xl">{text}</p>
    </div>
  )
}