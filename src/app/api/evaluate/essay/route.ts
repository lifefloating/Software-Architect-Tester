import { NextRequest, NextResponse } from 'next/server';

// DeepSeek API integration (reuse or centralize this function)
async function callDeepSeekAPI(prompt: string, apiKey: string): Promise<any> {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位经验丰富的软考高级系统架构师考试阅卷老师，擅长根据评分标准对考生的答案进行评分和反馈。请严格按照要求的JSON格式返回评分结果。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('DeepSeek API error:', errorData);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response from the model
    return JSON.parse(content);
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    
    // Fallback to mock response if API call fails
    return {
      total_score: 75,
      user_score: 62, // Different mock score for essay
      passed: true,
      feedback: {
        overall: "API调用失败，返回模拟评分。实际使用时请确保API Key正确且有效。",
        topic_relevance: "无法评估",
        content_structure: "无法评估",
        technical_depth: "无法评估",
        writing_quality: "无法评估",
        suggestions: "请检查API Key和网络连接，然后重试。"
      }
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { topic, content, apiKey } = await req.json();

    if (!topic || !content || !apiKey) {
      return NextResponse.json({ error: '缺少论文题目、内容或 API Key' }, { status: 400 });
    }

    // Construct the prompt based on the design document
    const prompt = `
你是一位经验丰富的软考高级系统架构师考试阅卷老师。
请根据以下论文题目和考生论文，按照软考评分标准进行评分（满分75分，45分及格）。

评分标准重点关注：
1. 切合题意：是否紧扣主题，论点明确。
2. 内容与结构：逻辑清晰，结构完整，论据充分。
3. 技术深度与实践性：体现对架构设计、技术选型的深入理解和实际项目经验。
4. 创新性与实用价值：是否有独到见解和实际应用价值。
5. 文字表达：语言流畅，专业术语使用准确，无错别字。
6. 字数要求：通常要求正文 2000-2500 字左右（请根据内容判断是否符合要求，但评分主要基于质量）。

论文题目：
${topic}

考生论文：
${content}

请以 JSON 格式返回评分结果，包含以下字段：
- "total_score": 75 (固定)
- "user_score": number (你的评分，必须是45-75之间的整数，如果不及格则为0-44之间的整数)
- "passed": boolean (是否及格，user_score >= 45 为true，否则为false)
- "feedback": {
    "overall": "string (总体评价，100-150字)",
    "topic_relevance": "string (切题性评价，50-80字)",
    "content_structure": "string (内容与结构评价，80-120字)",
    "technical_depth": "string (技术深度与实践性评价，100-150字)",
    "writing_quality": "string (文字表达评价，50-80字)",
    "suggestions": "string (改进建议，100-150字)"
  }
`;

    // Call the DeepSeek API
    const result = await callDeepSeekAPI(prompt, apiKey);

    // Return the result from the API
    return NextResponse.json(result);

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: '处理评分请求时发生内部错误' }, { status: 500 });
  }
}

