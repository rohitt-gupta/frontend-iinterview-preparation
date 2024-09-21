import { useState } from "react";

const useFetch = (url, options = {}) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchData = useCallback(async () => {
		setLoading(true);

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const result = await response.json();
			setData(result);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, [url, options]);

	useEffect(() => {
		if (options.manual) return;
		fetchData();
	}, [fetchData, options.manual]);

	return { data, error, loading, refetch: fetchData };
};

// const { data, loading, error, refetch } = useFetch(
// 	"https://api.example.com/data",
// 	{
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({ key: "value" }),
// 		manual: true,
// 	}
// );

// // Later, when you want to fetch:
// refetch();
