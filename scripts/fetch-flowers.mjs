import { mkdir, writeFile } from 'node:fs/promises'

const base = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?fm=jpg&fit=crop&w=${w}&q=75`

const images = {
  'hero.jpg': base('photo-1490750967868-88aa4486c946', 1800),
  'editorial.jpg': base('photo-1487530811176-3780de880c2d', 1600),
  'auth.jpg': base('photo-1455659817273-f96807779a8a', 1600),
  'cat-roses.jpg': base('photo-1518895949257-7621c3c786d7'),
  'cat-lilies.jpg': base('photo-1508610048659-a06b669e3321'),
  'cat-tulips.jpg': base('photo-1526047932273-341f2a7631f9'),
  'cat-orchids.jpg': base('photo-1582794543139-8ac9cb0f7b11'),
  'cat-sunflowers.jpg': base('photo-1470509037663-253afd7f0f51'),
  'cat-bouquets.jpg': base('photo-1563241527-3004b7be0ffd'),
  'cat-plants.jpg': base('photo-1459411552884-841db9b3cc2a'),
  'p-crimson.jpg': base('photo-1518895949257-7621c3c786d7'),
  'p-blush.jpg': base('photo-1496062031456-07b8f162a322'),
  'p-midnight.jpg': base('photo-1494972308805-463bc619d34e'),
  'p-ivory.jpg': base('photo-1567696153798-9111f9cd3d0d'),
  'p-stargazer.jpg': base('photo-1468327768560-75b778cbb551'),
  'p-dawn.jpg': base('photo-1526047932273-341f2a7631f9'),
  'p-scarlet.jpg': base('photo-1559563362-c667ba5f5480'),
  'p-orchid.jpg': base('photo-1582794543139-8ac9cb0f7b11'),
  'p-moon.jpg': base('photo-1502977249166-824b3a8a4d6d'),
  'p-golden.jpg': base('photo-1470509037663-253afd7f0f51'),
  'p-meadow.jpg': base('photo-1487530811176-3780de880c2d'),
  'p-peony.jpg': base('photo-1572454591674-2739f30d8c40'),
  'p-wedding.jpg': base('photo-1522748906645-95d8adfd52c7'),
  'p-grace.jpg': base('photo-1508610048659-a06b669e3321'),
  'p-olive.jpg': base('photo-1459411552884-841db9b3cc2a'),
  'p-wild.jpg': base('photo-1462275646964-a0e3386b89fa'),
  'p-roses-hand.jpg': base('photo-1455659817273-f96807779a8a'),
  'p-garden.jpg': base('photo-1416879595882-3373a0480b5b'),
}

await mkdir(new URL('../public/flowers/', import.meta.url), { recursive: true })

const dir = new URL('../public/flowers/', import.meta.url)

const results = await Promise.all(
  Object.entries(images).map(async ([name, url]) => {
    try {
      const res = await fetch(url, {
        headers: {
          Accept: 'image/jpeg',
          'User-Agent': 'BloomAtelierImageFetch/1.0',
        },
      })
      if (!res.ok) return `${name} HTTP ${res.status}`
      const type = res.headers.get('content-type') || ''
      if (!type.includes('jpeg') && !type.includes('jpg')) return `${name} not jpeg (${type})`
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length < 8000 || buf[0] !== 0xff || buf[1] !== 0xd8) return `${name} invalid jpeg (${buf.length})`
      await writeFile(new URL(name, dir), buf)
      return `${name} ok ${buf.length}`
    } catch (error) {
      return `${name} FAIL ${error.message}`
    }
  }),
)

console.log(results.join('\n'))
