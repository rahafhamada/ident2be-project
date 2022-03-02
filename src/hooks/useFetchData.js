import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    const source = axios.CancelToken.source();
    axios
      .get(url, {
        cancelToken: source.token,
        headers: {
          Authorization: "Basic ZXh0ZGF0YTplYTI0MmM3MjhiYmVjZWUxOWY3NzEyNjcyNzNlOWU4Yg==",
        },
      })
      .then(res => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch(err => {
        setLoading(false);
        setError("An error occurred. Awkward..");
      });
    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, loading, error };
};
export default useFetchData;
