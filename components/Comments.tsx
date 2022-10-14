import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import NoResults from './NoResults'

import { IUser } from '../typings'

interface UserProps extends IUser { }

interface CommentProps {
  isPostingComment: boolean
  comment: string
  setComment: Dispatch<SetStateAction<string>>
  addComment: (e: React.FormEvent) => void
  comments: IComment[]
}

interface IComment {
  comment: string
  length?: number
  key: string
  postedBy: {
    _ref: string
    _id: string
  }
}

export default function Comments({ isPostingComment, comment, setComment, addComment, comments }: CommentProps) {
  const { userProfile, allUsers } = useAuthStore()

  return (
    <div className="boder-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[450px]">
        {comments?.length ? (
          comments.map((comment, index) => (
            <>
              {allUsers.map((user: UserProps) => (
                user._id === (comment.postedBy._id || comment.postedBy._ref) && (
                  <div
                    key={index}
                    className="p-2 items-center"
                  >
                    <Link href={`/profile/${user._id}`}>
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12">
                          <Image
                            src={user.image}
                            width={54}
                            height={54}
                            className="rounded-full"
                            alt="User Profile"
                            layout="responsive"
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

                    <div>
                      <p className="pl-10">{comment.comment}</p>
                    </div>
                  </div>
                )
              ))}
            </>
          ))
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form
            onSubmit={addComment}
            className="flex gap-4"
          >
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="bg-primary px-3 py-2 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] boder-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button
              onClick={addComment}
              className="text-md text-gray-500"
            >
              {isPostingComment ? 'Commenting...' : 'comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}