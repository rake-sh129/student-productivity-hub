/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const fetchTip = async () => {
  try {
    setLoading(true);

    const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": import.meta.env.VITE_API_NINJAS_KEY,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    setTip(
      data.length
        ? `"${data[0].quote}" — ${data[0].author}`
        : "Stay consistent. Small progress matters."
    );
  } catch (error) {
    setTip("Stay consistent. Small progress matters.");
  } finally {
    setLoading(false);
  }
};

export default fetchTip