import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You generate 3 hands-on AI build challenges for participants in the Vana Vibe Sessions workshop. Each challenge must match the participant's selected level and discipline exactly.

LEVEL DEFINITIONS (strict):

Level 1 (Beginner): No coding. Single AI tool. Completable in 30 to 60 minutes. Examples: write a formal letter, summarize a long report, draft a speech, structure an email response, extract key points from a meeting transcript.

Level 2 (Confident user): Multi-step prompting. Combining tools. Completable in 1 to 2 hours. Examples: build a content calendar, analyze a small CSV, create a stakeholder map, draft a policy brief from raw inputs.

Level 3 (Builder): First coding exposure via vibe coding tools (Cursor, Lovable, Bolt, Replit, v0). Completable in 2 to 3 hours. Examples: build a landing page, prototype a form, ship a simple static website, create a basic dashboard.

Level 4 (Advanced): Real engineering. APIs, databases, deployment. Completable in 3 to 4 hours. Examples: build a working web app with authentication, develop a database with a CRUD interface, create a multi-step automation, integrate two APIs.

Level 5 (Expert): Production-ready. Multi-component systems. Completable in 4 to 6 hours. Examples: build an MCP server with three tools, ship a deployable agent with memory and tool use, build a data pipeline with Vana integration, develop a working DataDAO.

DISCIPLINE: Challenges must be grounded in real problems someone working in {DISCIPLINE} actually faces. Avoid generic "build a todo app" examples.

VANA INTEGRATION HOOK: For each challenge, include one optional way the participant could extend it using Vana tools (DataConnect, Context Gateway, Primary Source Datasets, or the broader Vana protocol). Keep this brief and only include if genuinely useful.

OUTPUT FORMAT: Return a JSON array of exactly 3 challenge objects:
{
  "title": "5 to 8 words",
  "description": "One sentence",
  "estimatedTime": "e.g. 90 minutes",
  "suggestedTools": ["tool 1", "tool 2"],
  "successCriteria": ["criterion 1", "criterion 2", "criterion 3"],
  "vanaHook": "Optional one-line extension using Vana tools, or null"
}

Return only the JSON. No preamble. No markdown fences.`

export async function POST(req: NextRequest) {
  try {
    const { level, discipline } = await req.json()

    if (!level || !discipline) {
      return NextResponse.json({ error: 'Missing level or discipline' }, { status: 400 })
    }

    const systemWithDiscipline = SYSTEM_PROMPT.replace('{DISCIPLINE}', discipline)

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: systemWithDiscipline,
      messages: [
        {
          role: 'user',
          content: `Level: ${level}\nDiscipline: ${discipline}`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    const challenges = JSON.parse(content.text)

    if (!Array.isArray(challenges) || challenges.length !== 3) {
      throw new Error('Invalid challenge format returned')
    }

    return NextResponse.json({ challenges })
  } catch (err) {
    console.error('Challenge generation error:', err)
    return NextResponse.json({ error: 'Failed to generate challenges' }, { status: 500 })
  }
}
