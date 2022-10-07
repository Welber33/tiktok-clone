import type { NextPage } from 'next'
import axios from 'axios'
import { Video } from '../typings'
import VideoCard from '../components/VideoCard'
import NoResults from '../components/NoResults'

interface Props {
  videos: Video[]
}

const Home = ({ videos }: Props) => {
  console.log(videos)

  return (
    <div className="flex flex-col gap-10 h-full">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id}/>
        ))
      ) : (
        <NoResults text={'No videos'}/>
      )}
    </div>
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
