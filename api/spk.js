// 该文件放在 /api/spk.js  (Vercel Serverless Function)
export default async function handler(req, res) {
  const { addr = '' } = req.query
  if (!/^0x[a-fA-F0-9]{40}$/.test(addr)) {
    res.status(400).json({ error: 'invalid address' })
    return
  }

  try {
    const r = await fetch(
      `https://spark2-api.blockanalitica.com/api/v1/spk-airdrop/${addr}/`,
      { headers: { accept: 'application/json' } }
    )
    const data = await r.json()
    res.setHeader('Access-Control-Allow-Origin', '*')   // 关键！
    res.status(r.status).json(data)
  } catch (e) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(500).json({ error: e.message })
  }
}

// 选用 Edge Function（Deno 环境）的话写法略有差别：
export const config = { runtime: 'edge' }
