// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchQuestions() {
  try {
    const res = await fetch("http://localhost:12413/questions", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      alert("Problem while fetching questions...");
      return;
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
