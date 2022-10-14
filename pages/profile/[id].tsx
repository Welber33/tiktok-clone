import { useState, useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../typings'

interface UserProps extends IUser { }
interface UserVideos extends Video { }

interface Props {
  data: {
    user: UserProps,
    userVideos: UserVideos[],
    userLikedVideos: UserVideos[]
  }
}

export default function Profile({ data }: Props) {
  const [showUserVideos, setShowUserVideos] = useState<boolean>(true)
  const [videosList, setVideosList] = useState<UserVideos[]>([])
  const { user, userVideos, userLikedVideos } = data

  useEffect(() => {
    showUserVideos ? setVideosList(userVideos) : setVideosList(userLikedVideos)
  }, [showUserVideos, userLikedVideos, userVideos])

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={80}
            height={80}
            className="rounded-full"
            alt="User Profile"
            layout="responsive"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase">
            {user.userName.replaceAll(' ', '')}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize md:text-lg text-gray-400 text-xs">
            {user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p 
          onClick={() => setShowUserVideos(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${showUserVideos ? 'border-b-[3px] border-black' : 'text-gray-400'}`}
          >
            Videos
          </p>

          <p 
          onClick={() => setShowUserVideos(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${!showUserVideos ? 'border-b-[3px] border-black' : 'text-gray-400'}`}
          >
            Likes
          </p>
        </div>

        <div className="flex gap-6 flex-col md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: UserVideos, index: number) => (
              <VideoCard post={post} key={index} />
            ))
          ) : (
            <NoResults text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet!`}/>
          )}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`)

  return {
    props: { data: res.data }
  }
}