export default async function handler(req, res) {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: "출발지와 도착지를 입력하세요." });
  }

  const kakaoApiUrl = "https://apis-navi.kakaomobility.com/v1/directions";
  const apiKey = "KakaoAK 864c420a6ab68fbe27f759e756eb3563";

  try {
    const response = await fetch(`${kakaoApiUrl}?origin=${origin}&destination=${destination}`, {
      method: "GET",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "카카오 API 호출 실패", detail: error.message });
  }
}
