import React, {useEffect, useState} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect( async () => {
        setLoading(true);
       await fetch(url).then(res => res.json()).then(data => setData(data))
        .catch(err => {
            setError(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [url])

    return {data, loading, error}
}

export default useFetch;