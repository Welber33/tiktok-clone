import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { FaRegHeart } from 'react-icons/fa'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'
import { Video } from '../../typings'
import { BsFillPlayFill } from 'react-icons/bs'

import useAuthStore from '../../store/authStore'
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'

interface VideoProps {
  postDetails: Video
}

export default function Detail({ postDetails }: VideoProps) {
  const [post, setPost] = useState(postDetails)
  const [playing, setPlaying] = useState<boolean>(false)
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false)

  const router = useRouter()

  const videoRef = useRef<HTMLVideoElement>(null)

  const { userProfile }: any = useAuthStore()

  if (!post) return null

  function onVideoClick() {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [post, isVideoMuted])

  async function handleLike( like: boolean){
    if(userProfile) {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })

      setPost({ ...post, likes: data.likes })
    }
  }

  async function addComment(e: React.FormEvent){
    e.preventDefault()

    if(userProfile && comment){
      setIsPostingComment(true)

      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      })

      setPost({ ...post, comments: data.comments })
      setComment('')
      setIsPostingComment(false)
    }
  }

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p
            onClick={() => router.back()}
            className="cursor-pointer"
          >
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>

        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer focus:ring-2 ring-white"
            >
            </video>
          </div>

          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-white  text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-16 md:h-16 w-10 h-10">
              <Link href={`/profile/${post.postedBy._id}`}>
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                    alt="profile photo"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>

            <div>
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className="mt-2 flex flex-col gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName} {' '}
                    <GoVerified
                      className="text-blue-400 text-md"
                    />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className="mt-4 text-lg px-10 text-md text-gray-700">
            {post.caption}
          </p>

          <div className="mt-10 px-10">
            { userProfile && (
              <LikeButton 
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments 
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>

    </div>
  )
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data }
  }
}