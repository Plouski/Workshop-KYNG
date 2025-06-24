export async function load({ fetch }) {
	const res = await fetch(
		'http://localhost:1337/api/pages?filters[slug][$eq]=about&populate[blocks][on][about.about][populate]=image'
	);
	const json = await res.json();

	if (!json.data || json.data.length === 0) {
		return { page: null };
	}

	return {
		page: json.data[0]
	};
}
