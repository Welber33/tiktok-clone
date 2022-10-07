import type { NextPage } from 'next'
import axios from 'axios'
import { Video } from '../typings'

interface Props {
  videos: Video[]
}

const Home = ({ videos }: Props) => {
  console.log(videos)

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export async function getServerSideProps(){
  const { data }  = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`);

  return {
    props: {
      videos: data
    }
  }
}

export default Home
