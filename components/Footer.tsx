import React from 'react'

import { footerList1, footerList2, footerList3 } from '../utils/constants'

type Props = {
  items: string[];
  mt: boolean;
}

function List({ items, mt }: Props) {
  return (
    <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
      {items.map((item) => (
        <p 
          key={item} 
          className="text-gray-400 text-sm hover:text-gray-700 cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  )

}
export default function Footer({ }: Props) {
  return (
    <div className="mt-6 hidden xl:block">
      <List items={footerList1} mt={false}/>
      <List items={footerList2} mt/>
      <List items={footerList3} mt/>
      <p className="text-gray-400 text-sm mt-5">
        2022 TikTok Clone
      </p>
    </div>
  )
}