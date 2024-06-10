import NextCors from 'nextjs-cors';
import hash from "@/util/hash";

async function handler(req: any, res: any) {
  await NextCors(req, res, {
    methods: ['GET', 'POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const response = await fetch('https://opendata.mkrf.ru/v2/egrkn/$?f={%22data.general.address.fullAddress%22:{%22$gt%22:%220%22},%22data.general.region.value%22:{%22$search%22:%22%D0%9A%D0%B5%D0%BC%D0%B5%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%22}}&l=30', {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "X-API-KEY": "6ec843cf40fe76a9f4c2b7e2cce4769c69b26c64bd76e973e94fd5cc05a3028b"
    }
  });

  const result = hash;

  const resu: any = result.data.map((element: any) => {
    if (!!element.data.general.address.fullAddress.match(/г\.[ |[А-яЁё]*/)) {
      if (req.query.city === element.data.general.address.fullAddress.match(/г\.[ |[А-яЁё]*/)[0].replace(/г\./g, '').replace(/ /g, '')) {
        return {
          id: element._id,
          name: element.data.general.name,
          description: element.data.general.objectType.value,
          photo: element.data.general.photo
        }
      }
    }
  }).filter((element: any) => !!element)

  res.json(JSON.stringify(resu));
}

export default handler;