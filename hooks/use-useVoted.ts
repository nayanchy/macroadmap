"use client";

import { userVoted } from "@/lib/handlers/action";
import { useEffect, useState } from "react";

interface UseUserVotedResult {
  voted: boolean | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useUserVoted = (itemId: string): UseUserVotedResult => {
  const [voted, setVoted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVoteStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await userVoted(itemId);

      setVoted(result.voted !== undefined ? result.voted : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setVoted(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itemId) {
      fetchVoteStatus();
    }
  }, [itemId]);

  const refetch = () => {
    fetchVoteStatus();
  };

  return { voted, loading, error, refetch };
};

export default useUserVoted;
