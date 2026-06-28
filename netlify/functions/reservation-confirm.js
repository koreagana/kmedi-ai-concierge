import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import LZString from 'lz-string'

const currentDir = dirname(fileURLToPath(import.meta.url))
const TEMPLATE = readFileSync(join(currentDir, 'reservation-confirm-template.html'), 'utf-8')

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Decodes the patient data already embedded in the URL by the sender's browser
// (lz-string compressed JSON in ?d=) purely to build a human-readable title.
// Nothing here is written to disk or a database.
function buildTitleAndDescription(compressed) {
  if (!compressed) {
    return { title: '预约确认书', description: '点击查看预约确认书' }
  }
  try {
    const json = LZString.decompressFromEncodedURIComponent(compressed)
    if (!json) return { title: '预约确认书', description: '点击查看预约确认书' }
    const data = JSON.parse(json)
    const hospital = data.hk || data.hz || ''
    const title = hospital ? `${hospital} 预约确认书` : '预约确认书'
    const description = hospital ? `${hospital} 预约确认书` : '点击查看预约确认书'
    return { title, description }
  } catch {
    return { title: '预约确认书', description: '点击查看预约确认书' }
  }
}

export const handler = async (event) => {
  const compressed = event.queryStringParameters && event.queryStringParameters.d
  const { title, description } = buildTitleAndDescription(compressed)

  const html = TEMPLATE
    .replaceAll('__TITLE__', escapeHtml(title))
    .replaceAll('__DESC__', escapeHtml(description))

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: html,
  }
}
