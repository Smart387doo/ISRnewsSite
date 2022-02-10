import { getIndexBa, getKlix, getN1News, getOslobodjenjeNews, getVecernjiListNews, getAvaz } from "../../helper/helperFunctions";
export default async function handler(req, res) {
  const n1News = await getN1News();
  const klixNews = await getKlix();
  const vecernjiNews = await getVecernjiListNews();
  const oslobodjenjeNews = await getOslobodjenjeNews();
  const indexBa = await getIndexBa();
  const avaz = await getAvaz();
  res.status(200).json({ n1: n1News, klix: klixNews, vecernji: vecernjiNews, oslobodjenje: oslobodjenjeNews, indexBa, avaz: avaz });
}
