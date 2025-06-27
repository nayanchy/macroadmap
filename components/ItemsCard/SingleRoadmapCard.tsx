import { months } from "@/constants/data";
import { getTimeAgo } from "@/lib/handlers/client-actions";
import { RoadmapType } from "@/types/roadmap";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleRoadmapCard = ({ roadmap }: { roadmap: RoadmapType }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg">
      <Link href={`roadmaps/${roadmap.slug}`}></Link>
      <div className="relative">
        <Link href={`roadmaps/${roadmap.slug}`}>
          <Image
            className="w-full"
            src="/images/coverimg.jpg"
            alt="Sunset in the mountains"
            width={300}
            height={300}
          />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </Link>
        <Link href={`roadmaps/${roadmap.slug}`}>
          <div className="absolute bottom-0 left-0 bg-primary-500 px-4 py-2 text-white text-sm hover:bg-slate-900 hover:text-shadow-slate-50 transition duration-500 ease-in-out">
            Roadmap
          </div>
        </Link>

        <Link href={`roadmaps/${roadmap.slug}`}>
          <div className="text-sm absolute top-0 right-0 bg-primary-500 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-slate-900 hover:text-shadow-slate-50 transition duration-500 ease-in-out">
            <span className="font-bold">{roadmap.createdAt.getDate()}</span>
            <small>{months[roadmap.createdAt.getMonth()]}</small>
          </div>
        </Link>
      </div>
      <div className="px-6 py-4">
        <Link
          href={`roadmaps/${roadmap.slug}`}
          className="font-semibold text-lg inline-block hover:text-primary-500 transition duration-500 ease-in-out"
        >
          {roadmap.title}
        </Link>
        <p className="text-gray-500 text-sm">{roadmap.description}</p>
      </div>
      <div className="px-6 py-4 flex flex-row items-center">
        <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
          <span className="ml-1">{getTimeAgo(roadmap.createdAt)}</span>
        </span>
      </div>
    </div>
  );
};

export default SingleRoadmapCard;
