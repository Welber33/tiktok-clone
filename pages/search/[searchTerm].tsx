import { useState } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../typings'
import useAuthStore from '../../store/authStore'

type Props = {}

export default function Search({ videos }: { videos: Video[] }) {
  const [isAccounts, setIsAccounts] = useState<boolean>(false)
  const { allUsers } = useAuthStore()

  const router = useRouter()
  const { searchTerm }: any = router.query

  const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${isAccounts ? 'border-b-[3px] border-black' : 'text-gray-400'}`}
        >
          Accounts
        </p>

        <p
          onClick={() => setIsAccounts(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${!isAccounts ? 'border-b-[3px] border-black' : 'text-gray-400'}`}
        >
          Videos
        </p>
      </div>

      {isAccounts ? (
        <div className="md:mt-8">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, index: number) => (
              <Link href={`/profile/${user._id}`} key={index}>
                <div className="flex items-start gap-3 p-2 border-b-2 cursor-pointer hover:bg-gray-200 rounded-lg">
                  <div>
                    <Image
                      src={user.image}
                      width={54}
                      height={54}
                      className="rounded-full"
                      alt="User Profile"
                    />
                  </div>

                  <div className="hidden xl:block">
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName.replaceAll(' ', '')}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">{user.userName}</p>
                  </div>
                </div>

              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-10 flex flex-col gap-6 md:justify-start">
          {videos.length > 0 ? (
            videos.map((video: Video, index) => (
              <VideoCard post={video} key={index} />
            ))
          ) : (
            <NoResults text={`No video Results for ${searchTerm} topic`} />
          )}
        </div>
      )}

    </div>
  )
}

export async function getServerSideProps({ params: { searchTerm } }: { params: { searchTerm: string } }) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchTerm}`)

  return {
    props: { videos: res.data }
  }
}