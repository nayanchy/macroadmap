"use client";

import {
  getUpvotes,
  handleUpvoteRoadmapItem,
  userVoted,
} from "@/lib/handlers/action";
import { useEffect, useState, useTransition } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { Button } from "../ui/button";

const Upvote = ({
  itemId,
  initialUpvotes,
}: {
  itemId: string;
  initialUpvotes: number;
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [pending, startTransition] = useTransition();
  const [isUserVoted, setIsUserVoted] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUpvotes = async () => {
      const result = (await getUpvotes(itemId)) as { upvotes: number };
      setUpvotes(result.upvotes);
    };
    fetchUpvotes();

    const isUserVoted = async () => {
      const result = await userVoted(itemId);

      setIsUserVoted(result.voted);
    };

    isUserVoted();
  }, [itemId]);

  const handleUpvote = () => {
    startTransition(async () => {
      const result = await handleUpvoteRoadmapItem(itemId);
      if (typeof result === "object" && result && "upvotes" in result) {
        setUpvotes(result.upvotes);
        setIsUserVoted(!isUserVoted);
      }
    });
  };
  return (
    <div className="flex items-center gap-4">
      <Button
        type="submit"
        className={`px-3 py-1 rounded-full bg-slate-800 flex-center gap-2 cursor-pointer hover:bg-slate-700 transition-colors ${
          pending ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleUpvote}
        disabled={pending}
        asChild
      >
        <div>
          {isUserVoted ? (
            <BiSolidLike className="text-primary-500" />
          ) : (
            <BiLike className="text-primary-500" />
          )}
          <span className="text-white">{`${upvotes}`}</span>
        </div>
      </Button>
    </div>
  );
};

export default Upvote;
