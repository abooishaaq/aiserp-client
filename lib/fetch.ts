import { useEffect, useCallback, useState, useMemo, useRef } from "react";
import { useError } from "./message";
import LRU from "lru-cache";

export const fetcher = (url: string) =>
    fetch(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => response.json());

const lruOpts = {
    ttl: 1000 * 60 * 5,
    max: 100,
};

const cache = new LRU(lruOpts);

export const useFetch = (url: string) => {
    const reqSent = useRef(false);
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<boolean>(false);
    const { setError: setUIError } = useError();
    const [data, setData] = useState<any>({});

    const fetchData = useCallback(() => {
        fetch(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                setStatus(res.status);
                if (res.ok) {
                    res.json()
                        .then((data) => {
                            setData(data);
                            cache.set(url, data);
                            setLoading(false);
                        })
                        .catch(() => {
                            setUIError("Error parsing response");
                            setLoading(false);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                setError(true);
                setLoading(false);
            });
    }, [setUIError, url]);


    useEffect(() => {
        if (url) {
            if (cache.has(url)) {
                setData(cache.get(url));
                setLoading(false);
            } else if (!reqSent.current) {
                reqSent.current = true;
                fetchData();
            }
        }
    }, [fetchData, loading, url]);

    return { data, loading, refresh: fetchData, status, error };
};

export const post = (url: string, data: any = null) => {
    const headers: any = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    if (data) {
        headers["Content-Type"] = "application/json";
    }

    const body = data ? JSON.stringify(data) : null;

    return fetch(url, {
        method: "POST",
        headers,
        body,
    });
};
