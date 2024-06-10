const fetcher = async (...args: any) => await fetch(args[0], {
  method: "GET",
  headers: {
    "Accept": "application/json",
    "X-API-KEY": "6ec843cf40fe76a9f4c2b7e2cce4769c69b26c64bd76e973e94fd5cc05a3028b",
  }
}).then(res => res.json())

export default fetcher;