import { getKlixNews, getN1News, getOslobodjenjeNews, getVecernjiListNews } from "../../helper/helperFunctions";
export default async function handler(req, res) {
  const n1News = await getN1News();
  const klixNews = await getKlixNews();
  const vecernjiNews = await getVecernjiListNews();
  const oslobodjenjeNews = await getOslobodjenjeNews();
  res.status(200).json({ n1: n1News, klix: klixNews, vecernji: vecernjiNews, oslobodjenje: oslobodjenjeNews });
}
