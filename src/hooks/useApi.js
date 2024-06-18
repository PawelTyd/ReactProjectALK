import { useEffect, useState } from "react";
import { useBoundStore } from "../store/useBoundStore";

export const useApi = (url) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const { setUsers, setOriginalUsers, users } = useBoundStore((state) => ({
    setUsers: state.setUsers,
    setOriginalUsers: state.setOriginalUsers,
    users: state.users,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetch(url);
        const json = await data.json();
        setUsers(json);
        setOriginalUsers(json);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, setOriginalUsers, setUsers]);

  return {
    isError,
    isLoading,
    users,
  };
};
