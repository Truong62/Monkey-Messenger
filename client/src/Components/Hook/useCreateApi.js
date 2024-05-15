import { useEffect, useState } from 'react';
import axios from 'axios';

const useApiUser = (url) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const postData = async (newData) => {
        try {
            setIsLoading(true);
            const response = await axios.post(url, newData);
            setData((prev) => ({
                ...prev,
                OTP: response.data.data
            }));
            setIsLoading(false)
        } catch (error) {
            setIsError(true);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
    }, [data]);

    const putData = async (newData) => {
        try {
            setIsLoading(true);
            const response = await axios.put(url, newData);
            setData(response.data);
        } catch (error) {
            setIsError(true);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            setIsLoading(true);
            await axios.delete(`${url}/${id}`);
            const updatedData = data.filter((item) => item.id !== id);
            setData(updatedData);
        } catch (error) {
            setIsError(true);
            console.error(error);
        } finally {
            setIsLoading(false);
        }

        // const fetchData = async () => {
        //     try {
        //         setIsLoading(true);
        //         const response = await axios.get(url);
        //         setData(response.data);
        //     } catch (error) {
        //         setIsError(true);
        //         console.error(error);
        //     } finally {
        //         setIsLoading(false);
        //     }
        // };

        // useEffect(() => {
        //     fetchData();
        //     // eslint-disable-next-line react-hooks/exhaustive-deps
        // }, []);

    };

    return {
        data,
        isLoading,
        isError,
        postData,
        putData,
        deleteData,
    };
};

export default useApiUser;
