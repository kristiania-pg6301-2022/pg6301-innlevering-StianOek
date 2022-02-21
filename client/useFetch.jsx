import React, { useState, useEffect } from "react";

export class HttpError extends Error {
  constructor(status, statusText) {
    super(statusText);
    this.status = status;
  }
}

export const fetchJSON = async (url) => {
  const res = await fetch(url);
  if (res.status === 401) {
    return null;
  }
  if (res.ok) {
    return await res.json();
  } else {
    throw new HttpError(res.status, res.statusText);
  }
};

export const useLoading = (Loader) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(async () => {
    setLoading(true);
    try {
      setData(await Loader());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
};

export async function postJSON(url, json) {
  const res = await fetch(url, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(json),
  });
  if (!res.ok) {
    throw new HttpError(res.status, res.statusText);
  }
}
